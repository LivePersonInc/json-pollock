#!/bin/bash
echoGreen()
{
	echo -e "\033[0;32m $1 \033[0m"
}

echoRed()
{
	echo -e "\033[0;31m $1 \033[0m"
}

echoNormal()
{
	echo -e "\033[0;35m $1 \033[0m"
}

SCHEMA_URL=(
	"https://lpgithub.dev.lprnd.net/raw/Architecture/json-schema/master/json-schema-files/src/main/resources/json_schemas/rich/action.json"
	"https://lpgithub.dev.lprnd.net/raw/Architecture/json-schema/master/json-schema-files/src/main/resources/json_schemas/rich/basic.json"
	"https://lpgithub.dev.lprnd.net/raw/Architecture/json-schema/master/json-schema-files/src/main/resources/json_schemas/rich/button.json"
	"https://lpgithub.dev.lprnd.net/raw/Architecture/json-schema/master/json-schema-files/src/main/resources/json_schemas/rich/card.json"
	"https://lpgithub.dev.lprnd.net/raw/Architecture/json-schema/master/json-schema-files/src/main/resources/json_schemas/rich/image.json"
	"https://lpgithub.dev.lprnd.net/raw/Architecture/json-schema/master/json-schema-files/src/main/resources/json_schemas/rich/linkPreview.json"
	"https://lpgithub.dev.lprnd.net/raw/Architecture/json-schema/master/json-schema-files/src/main/resources/json_schemas/rich/map.json"
	"https://lpgithub.dev.lprnd.net/raw/Architecture/json-schema/master/json-schema-files/src/main/resources/json_schemas/rich/rich_content.json"
	"https://lpgithub.dev.lprnd.net/raw/Architecture/json-schema/master/json-schema-files/src/main/resources/json_schemas/rich/style.json"
	"https://lpgithub.dev.lprnd.net/raw/Architecture/json-schema/master/json-schema-files/src/main/resources/json_schemas/rich/template.json"
	"https://lpgithub.dev.lprnd.net/raw/Architecture/json-schema/master/json-schema-files/src/main/resources/json_schemas/rich/text.json"
	"https://lpgithub.dev.lprnd.net/raw/Architecture/json-schema/master/json-schema-files/src/main/resources/json_schemas/rich/carousel.json"
	"https://lpgithub.dev.lprnd.net/raw/Architecture/json-schema/master/json-schema-files/src/main/resources/json_schemas/rich/section.json"
	"https://lpgithub.dev.lprnd.net/raw/Architecture/json-schema/master/json-schema-files/src/main/resources/json_schemas/rich/list.json"
	"https://lpgithub.dev.lprnd.net/raw/Architecture/json-schema/master/json-schema-files/src/main/resources/json_schemas/rich/checklist.json"
	"https://lpgithub.dev.lprnd.net/raw/Architecture/json-schema/master/json-schema-files/src/main/resources/json_schemas/rich/sectionList.json"
	"https://lpgithub.dev.lprnd.net/raw/Architecture/json-schema/master/json-schema-files/src/main/resources/json_schemas/rich/checkbox.json"
	"https://lpgithub.dev.lprnd.net/raw/Architecture/json-schema/master/json-schema-files/src/main/resources/json_schemas/rich/submitButton.json"
	"https://lpgithub.dev.lprnd.net/raw/Architecture/json-schema/master/json-schema-files/src/main/resources/json_schemas/rich/buttonList.json"
	"https://lpgithub.dev.lprnd.net/raw/Architecture/json-schema/master/json-schema-files/src/main/resources/json_schemas/rich/specialAction.json"
	"https://lpgithub.dev.lprnd.net/raw/Architecture/json-schema/master/json-schema-files/src/main/resources/json_schemas/rich/keyValuePair.json"
	"https://lpgithub.dev.lprnd.net/raw/Architecture/json-schema/master/json-schema-files/src/main/resources/json_schemas/rich/displaySettings.json"
	"https://lpgithub.dev.lprnd.net/raw/Architecture/json-schema/master/json-schema-files/src/main/resources/json_schemas/rich/accessibilityWeb.json"
)

echoGreen "This script sync the schema files under the 'js/schema' folder."
echoGreen "It can be used only from within the LivePerson corporate network."
echoGreen "Make sure to provide the credentials for the corporate Github (lpgithub) - your credentials will not be saved."

echo
echo

echoNormal "lpgithub user: "
read -p " " USER
echoNormal "lpgithub password: "
read  -s PASS

USER_RES=$(curl -u $USER:$PASS https://lpgithub.dev.lprnd.net/api/v3/user | grep 'login')

if [[ $USER_RES == *$USER* ]]; then
	echoGreen "Credentials are valid :)"
else
	echoRed "Wrong Credentials :("
	exit 0
fi

for url in "${SCHEMA_URL[@]}"
do
	filename=js/schema/`basename $url`
	echoNormal "Fetching $filename..."
	curl -u $USER:$PASS $url | sed s/\"\$ref\"" *":" *"\"..\\/metadata\\/metadata.json\"/\"type\":" "\"array\"/g > $filename
done

echoGreen "Done fetching the schema files!"
echo
echoGreen "Before committing these files please make sure to:"
echoGreen "(1) Compare changes and make a visual verification"
echoGreen "(2) Run 'yarn build'"
echoGreen "(3) Run 'yarn test' and make sure that all the tests are passing"
echoGreen "(4) If needed - extend the tests to cover newly additions to the schema"
