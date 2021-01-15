curl --header "Content-Type: application/json" \
      --request POST \
      -d '{"email": "apples@gmail.com","password": "What@1234"}'\
      http://localhost:8080/api/users 

echo

curl --header "Content-Type: application/json" \
      --request POST \
      -d '{"email": "apples@gmail.com","password": "What@1234"}'\
      http://localhost:8080/api/login \

TOKEN=$(curl --header "Content-Type: application/json" \
      --request POST \
      -d '{"email": "apples@gmail.com","password": "What@1234"}'\
      http://localhost:8080/api/login \
      | jq -r '.token')

curl -H 'Accept: application/json' \
     -H "Authorization: Bearer ${TOKEN}" \
     --request GET \
     http://localhost:8080/api/users/

echo 

echo ${TOKEN}
echo

curl -H 'Accept: application/json' \
     -H "Authorization: Bearer ${TOKEN}" \
     --request GET \
     http://localhost:8080/api/users/

echo 
echo

TEAM=$(curl -H "Authorization: Bearer ${TOKEN}" \
        -H 'Content-Type: application/json' \
        --request POST \
        -d '{"title": "Testing","description": "a cool testing thing"}'\
        http://localhost:8080/api/teams \
        | jq -r '._id' )
echo 

echo ${TEAM}

echo 

curl -H 'Content-Type: application/json' \
     -H "Authorization: Bearer ${TOKEN}" \
     --request GET \
     http://localhost:8080/api/teams/${TEAM}
echo

curl -H "Authorization: Bearer ${TOKEN}" \
     -H 'Content-Type: application/json' \
     --request PUT \
     -d '{"title": "Look ma I changed it","description": "a cool testing thingy"}'\
     http://localhost:8080/api/teams/${TEAM}
echo 

echo
curl -H 'Content-Type: application/json' \
     -H "Authorization: Bearer ${TOKEN}" \
     --request GET \
     http://localhost:8080/api/teams/${TEAM}