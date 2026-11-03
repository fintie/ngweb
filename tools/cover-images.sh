#!/bin/bash
# One-off: the project covers as photos of people with motion blur, each in its own folder, Wonderful crops as material reference only.
ROOT=/c/Dev/nextgenius/out/cover-img
WIN=C:/Dev/nextgenius/out/cover-img
STYLE="Candid documentary photograph on 35mm film, with a real, unposed feel. One person is in sharp focus with their face in the upper third of the frame. Something passes very close to the camera, a passer-by or a shoulder, smeared into a heavy horizontal motion blur across the lower part and one side of the frame. Slow shutter, uneven natural light, deep shadows, fine visible analogue film grain, natural skin tones with real texture. Nobody looks at the camera. Portrait format, 4:5. Use the attached images only as a reference for film grain, light and motion blur. Do not copy their people, rooms, clothes or composition. No text, no letters, no numbers, no logos, no signs, no readable screens, no watermark."
run() {
  slug=$1; subject=$2
  mkdir -p "$ROOT/$slug"
  cp "$ROOT/ref/ref-a.png" "$ROOT/ref/ref-b.png" "$ROOT/$slug/"
  codex exec "Use your image generation tool to create one image and save it as $slug.png in the current folder. Subject: $subject $STYLE" -m gpt-5.6-sol -c model_reasoning_effort="low" --skip-git-repo-check -s workspace-write -C "$WIN/$slug" -i "$WIN/$slug/ref-a.png" "$WIN/$slug/ref-b.png" < /dev/null > "$ROOT/$slug/log.txt" 2>&1
  rm -f "$ROOT/$slug/ref-a.png" "$ROOT/$slug/ref-b.png"
}
run lunchup "Two people in their thirties who have just met, sharing lunch at a small cafe table by a window in Sydney, one of them laughing. Blue dominates the picture: a cobalt wall, a blue shirt, cool blue daylight from the window." &
run stem "A young adult student and an older tutor at a table, working through a maths problem on paper with a pencil and a ruler, the tutor pointing at the page. Deep green and teal dominate the picture: a dark green wall, green-tinted evening light from a lamp." &
run studio "A young creative person in a dim studio, leaning towards a large glowing wall of projected colour with no readable content, one hand raised as if shaping the picture. Warm amber, orange and magenta light falls across their face and fills the room." &
wait
ls -la "$ROOT"/*/*.png | awk '{print $5, $NF}'
md5sum "$ROOT"/*/*.png | awk '{print $1}' | sort | uniq -d
echo done
