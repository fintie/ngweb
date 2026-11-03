#!/bin/bash
# One-off: the round graph pictures as close photos of people, four at a time, each in its own folder. LunchUp, STEM and Studio reuse their covers.
# No reference picture on purpose: with the LunchUp cover as reference, Codex put the same woman into 8 of 10 pictures.
ROOT=/c/Dev/nextgenius/out/graph-photo
WIN=C:/Dev/nextgenius/out/graph-photo
STYLE="Candid documentary photograph on 35mm film, with a real, unposed feel. Square format, 1:1. Tight framing: the sharp face or faces fill the exact centre of the frame, large enough to read when the picture is shown very small inside a circle. Something passes close to the camera at the lower edge, a shoulder or a passer-by, smeared into a horizontal motion blur from a slow shutter, but it never covers a face. Blue dominates the picture: deep cobalt shadows and cool blue light, against natural warm skin tones. Deep shadows at the edges, uneven natural light, fine visible analogue film grain. Nobody looks at the camera. No text, no letters, no numbers, no logos, no signs, no readable screens, no watermark."
run() {
  slug=$1; subject=$2
  mkdir -p "$ROOT/$slug"
  codex exec "Use your image generation tool to create one image and save it as $slug.png in the current folder. Subject: $subject $STYLE" -m gpt-5.6-sol -c model_reasoning_effort="low" --skip-git-repo-check -s workspace-write -C "$WIN/$slug" < /dev/null > "$ROOT/$slug/log.txt" 2>&1
}
run nextgenius "A South Asian woman in her forties in a small Sydney office, explaining an idea with an open hand to a younger East Asian man who is listening and starting to smile." &
run workshops "A grey-haired man in his sixties, the workshop leader, leaning in beside a young East Asian woman at a long table, both looking down at a laptop whose screen is turned away from the camera, the leader pointing." &
run meetups "A Black man in his thirties and a South Asian man in his forties talking at an evening meetup in a brick-walled room, each holding a drink, one mid-sentence, the other laughing." &
run events "An East Asian woman in her fifties with short hair, a speaker with a handheld microphone on a small stage, mid-sentence with one hand raised, seen from the audience past the blurred heads in the front row." &
wait
run community "Four people standing close together in a loose circle, talking and laughing: a tall Pacific Islander man, an older white woman with silver hair, a young South Asian woman in a headscarf and an East Asian man in glasses, seen at head and shoulders height." &
run mcp "A young man of Middle Eastern background with a short beard at a desk, connecting a cable to a laptop, looking down in concentration, a phone and a small tablet beside him with their screens dark." &
run agents "An East Asian man in his thirties and a woman in her fifties with cropped grey hair at a whiteboard, he draws a simple flow of empty boxes and arrows with a marker, she points at it and thinks. No writing on the board." &
wait
run opc "A white man in his fifties with glasses and a short grey beard, alone in a tiny home studio late in the evening, working at a small desk by a lamp, calm and focused." &
run automation "A woman in her sixties with silver hair and glasses in an office, a stack of folders and envelopes at her elbow, leaning back from the desk with a look of relief, the first smile of the day." &
run sydney "A young South Asian man leaning on the rail of a ferry on Sydney Harbour at blue dusk, looking out over the water, the wind in his hair, the far shore soft and out of focus." &
wait
ls -la "$ROOT"/*/*.png | awk '{print $5, $NF}'
md5sum "$ROOT"/*/*.png | awk '{print $1}' | sort | uniq -d
echo done
