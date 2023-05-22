#!/bin/bash

cp ~/solidus/config/newrelic.yml.template ~/solidus/config/newrelic.yml
sed -i -e "s/LICENSE_KEY/$1/g" ~/solidus/config/newrelic.yml
echo "New Relic configuration is created"
