curl --header "Content-Type: application/json" \
      --request POST \
      -d '{"email": "ddddddddd@gmail.com","password": "what"}'\
      http://localhost:8080/api/users/register 

curl --header "Content-Type: application/json" \
      --request POST \
      -d '{"email": "apple@gmail.com","password": "what"}'\
      http://localhost:8080/api/users/authenticate \
     

TOKEN=$(curl --header "Content-Type: application/json" \
      --request POST \
      -d '{"email": "pasdul@gmail.com","password": "hellasdfo"}'\
      http://localhost:8080/api/users/authenticate \
      | jq -r '.token')

echo ${TOKEN}

curl -H 'Accept: application/json' \
     -H "Authorization: Bearer ${TOKEN}" \
     --request GET \
     http://localhost:8080/api/users/profile

echo 

curl -H 'Accept: application/json' \
     -H "Authorization: Bearer ${TOKEN}" \
     --request GET \
     http://localhost:8080/api/users/invites

echo 

curl -H "Authorization: Bearer ${TOKEN}" \
     --request POST \
     -H 'Accept: application/json' \
     -H 'Content-Type: application/json' \
     -d '{"title": "Testing","description": "a cool testing thing"}'\
     http://localhost:8080/api/teams

echo 

PROJID=$(curl -H 'Accept: application/json' \
     -H "Authorization: Bearer ${TOKEN}" \
     --request POST \
     -d '{"title": "Testing","description": "a cool testing thing"}'\
     http://localhost:8080/api/teams \
     | jq -r '._id')

curl -H 'Accept: application/json' \
     -H "Authorization: Bearer ${TOKEN}" \
     --request GET \
     http://localhost:8080/api/teams/${PROJID}

curl -H "Authorization: Bearer ${TOKEN}" \
     --request POST \
     -H 'Accept: application/json' \
     -H 'Content-Type: application/json' \
     -d '{"firstname": "HIGHEFFORT","lastname": "Smith"}'\
     http://localhost:8080/api/users/profiles \
