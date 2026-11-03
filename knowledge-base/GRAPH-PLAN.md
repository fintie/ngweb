# Knowledge graph on top of the knowledge base – stack check (2026-10-31)

Need: turn the 178 text chunks into a graph (things + relations + topic groups + group summaries) that can be explored and searched, for a site redesign. Data is our own public website text (no client data), ~35k words. Budget: free tier / flat Claude plan, no extra API bill.

Own past (brain search "graphrag", "lightrag"): no earlier decision. Nearest note: Graphiti (temporal agent memory) – wrong job (memory over time, not a document corpus).

| Need | Candidate | Licence | Upkeep (checked via gh api 2026-10-31) | Evidence | Fit for us | Verdict |
|---|---|---|---|---|---|---|
| Graph pipeline | Microsoft GraphRAG | MIT | 36.5k stars, pushed 2026-10-29 | Official docs (pasted by Lukas), pipeline: extract entities/relations with an LLM prompt → summarise → communities → community reports → local/global search | Method is exactly right. Running the package needs a paid LLM API key and many calls; our corpus is tiny | **Take the method** (same steps, same entity/relationship prompt idea), not the package |
| Graph pipeline | LightRAG | MIT | 40.4k stars, pushed 2026-10-29, 426 open issues | Repo README only | Lighter than GraphRAG, still needs an LLM API key and a Python service | ideas only |
| Graph pipeline | neo4j-graphrag-python | licence "NOASSERTION" (unclear) | 1.3k stars | Vendor library | Needs a Neo4j database server; overkill | skip |
| Graph pipeline | LlamaIndex property graph | MIT | 52.7k stars | Repo | General framework, API key needed, big dependency | skip |
| Extraction engine | Claude subagents (Sonnet) in this session, same prompt idea as GraphRAG | – | – | Our own flat plan; $0 extra | Corpus is public text, so provider rule is satisfied | **take** |
| Drawing | force-graph | MIT | 2.2k stars, pushed 2026-09-28 | Repo | Small canvas library, one file, fast for ~100–300 nodes | **take** |
| Drawing | Cytoscape.js | MIT | 11.3k stars, pushed 2026-10-30 | Repo | More layouts, heavier, built for analysis | backup |
| Own existing | knowledge-base/kb.json + search UI | ours | – | built today | Chunks already carry id, type, route, tags | **extend** |

Winner: GraphRAG's method run by Claude (no API bill) + our kb.json as input + force-graph for the picture.
Steps: 1 extract entities and relations per chunk (types: organization, service, technology, product, audience, event, place, concept, process) → 2 merge duplicates → 3 find topic groups (communities) with the Louvain method → 4 write one short report per group → 5 graph view + "local search" (pick a thing, see neighbours and source text).
Measure: every entity and relation must cite chunk ids; check that a random sample of 15 relations is really supported by its cited chunk text, and that a made-up relation is not found.
