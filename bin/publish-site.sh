#!/usr/bin/env bash

npm run build-site

branchname=build_$RANDOM

git checkout -b ${branchname}

mv dist/* .

git add -A
git add -f *-bundle.js
git commit -m 'build'

git push --force origin ${branchname}:gh-pages

git checkout -

git branch -D $branchname