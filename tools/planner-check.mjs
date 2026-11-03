// Checks site/public/planner.js against the 8 plans captured from the old site.
// Run: node tools/planner-check.mjs   (exit code 1 on any mismatch)
import fs from "node:fs";
import vm from "node:vm";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (p) => fs.readFileSync(path.join(root, p), "utf8");

// planner.js is a classic browser script; without a document it exposes globalThis.opcPlanner.
const sandbox = {};
vm.createContext(sandbox);
vm.runInContext(read("site/public/planner.js"), sandbox, { filename: "planner.js" });
const { generate, templates } = sandbox.opcPlanner;

const wizard = JSON.parse(read("out/opc-wizard.json"));
const { expertise, customer, problem } = wizard.example;
const MARKER = "[[EDITABLE TEXTAREA]]\n";
let failures = 0;
let matched = 0;

wizard.results.forEach((run, i) => {
  const lang = run.lang === "中文" ? "zh" : "en";
  const plan = generate({ expertise, customer, problem, format: run.format, hours: run.hours }, lang);
  const at = run.text.indexOf(MARKER);
  const captured = at === -1 ? run.text : run.text.slice(at + MARKER.length);
  const inside = run.text.includes(plan);
  const exact = captured === plan; // stricter: the whole captured textarea equals the plan
  if (inside && exact) matched++;
  else failures++;
  console.log(`run ${i} ${lang} format=${run.format} hours=${run.hours}: ${inside && exact ? "MATCH" : "DIFF"}` +
    ` (inside page text: ${inside}, equals textarea: ${exact})`);
  if (!inside) {
    let k = 0;
    while (k < plan.length && plan[k] === captured[k]) k++;
    console.log(`  first difference at char ${k}:\n  planner : ${JSON.stringify(plan.slice(k, k + 60))}\n  captured: ${JSON.stringify(captured.slice(k, k + 60))}`);
  }
});

// Page data: the Chinese JSON must mirror the English one, and its select labels must equal the templates.
const keys = (o, p = "") => Object.entries(o).flatMap(([k, v]) =>
  v && typeof v === "object" ? keys(v, `${p}${k}.`) : [`${p}${k}`]);
const en = JSON.parse(read("site/src/data/opc-en.json"));
const zh = JSON.parse(read("site/src/data/opc-zh.json"));
const sameKeys = JSON.stringify(keys(en)) === JSON.stringify(keys(zh));
const sameLabels = ["en", "zh"].every((l) => {
  const d = l === "en" ? en : zh;
  return JSON.stringify(d.plan.formats) === JSON.stringify(templates[l].formats.map((f) => f.name)) &&
    JSON.stringify(d.plan.hours) === JSON.stringify(templates[l].hours);
});
console.log(`opc-zh.json has the same keys as opc-en.json: ${sameKeys}`);
console.log(`format/hours labels in JSON equal planner.js templates: ${sameLabels}`);
if (!sameKeys || !sameLabels) failures++;

console.log(`\n${matched}/${wizard.results.length} captured plans match`);
process.exit(failures ? 1 : 0);
