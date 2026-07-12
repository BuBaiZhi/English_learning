import os, sys
os.environ["HF_ENDPOINT"] = "https://hf-mirror.com"
os.environ["HF_HUB_DISABLE_SYMLINKS_WARNING"] = "1"

from faster_whisper import WhisperModel

audio = "D:\\LEGION\\Documents\\New project\\english-learning-site\\dialogue.aac"
txt_out = "D:\\LEGION\\Documents\\New project\\english-learning-site\\dialogue_transcript.txt"
lessons_path = "D:\\LEGION\\Documents\\New project\\english-learning-site\\lessons.js"

print("[1/3] Loading Whisper model...")
model = WhisperModel("base", device="cpu", compute_type="int8",
                      download_root="D:\\LEGION\\Documents\\New project\\whisper_models",
                      cpu_threads=4)

print("[2/3] Transcribing dialogue.aac...")
segs, info = model.transcribe(audio, beam_size=3, best_of=3, language="en")
segs = list(segs)

print(f"   Got {len(segs)} segments, language: {info.language}")
lines = [s.text.strip() for s in segs]

# Save text file
with open(txt_out, "w", encoding="utf-8") as f:
    f.write("=== Dialogue Transcript ===\n\n")
    for i, line in enumerate(lines):
        f.write(f"{i+1}. {line}\n")
    f.write(f"\n--- {len(lines)} lines ---\n")
print(f"   Saved: dialogue_transcript.txt")

# Print to console
for i, line in enumerate(lines):
    print(f"   {i+1}. {line}")

print("\n[3/3] Updating lessons.js...")
with open(lessons_path, "r", encoding="utf-8") as f:
    c = f.read()

old_start = "    // ---- Original Text ----"
old_end = "    // ---- Audio Review ----"
s_idx = c.find(old_start)
e_idx = c.find(old_end, s_idx)

new_section = "    // ---- Original Text ----\n    original_text: [\n"
for line in lines:
    escaped = line.replace("\\", "\\\\").replace('"', '\\"')
    new_section += f'      "{escaped}",\n'
new_section += "    ],\n"

if s_idx >= 0 and e_idx > s_idx:
    c = c[:s_idx] + new_section + c[e_idx:]
    with open(lessons_path, "w", encoding="utf-8") as f:
        f.write(c)
    print("   lessons.js updated!")
else:
    print("   ERROR: Could not find original_text section in lessons.js")

print("\nDone!")
