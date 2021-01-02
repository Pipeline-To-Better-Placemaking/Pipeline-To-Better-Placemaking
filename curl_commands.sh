curl --header "Content-Type: application/json" \
      --request POST \
      -d '{"email": "pasdul@gmmail.com","password": "hellasdfo"}'\
      http://localhost:8080/api/users/register 

curl --header "Content-Type: application/json" \
      --request POST \
      -d '{"email": "pasdul@gmmail.com","password": "hellasdfo"}'\
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
