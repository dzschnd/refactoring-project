#!/bin/bash

# replace all .png files with .avif in current directory
for f in *.png; do
  [ -f "$f" ] || continue
  avifenc "$f" "${f%.png}.avif"
done
rm *.png
