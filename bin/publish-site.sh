#!/usr/bin/env bash

npm run build-site

rm -fr docs
cp -r dist docs

git add docs
git commit -m 'chore: build [skip-ci]'

git push origin master
