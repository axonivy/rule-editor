#!/bin/bash

REGISTRY="https://npmjs-registry.ivyteam.ch/"

npm unpublish "@axonivy/rule-editor@${1}" --registry $REGISTRY
npm unpublish "@axonivy/rule-editor-protocol@${1}" --registry $REGISTRY