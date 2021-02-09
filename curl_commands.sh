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

TEAM=$(curl -H 'Accept: application/json' \
     -H "Authorization: Bearer ${TOKEN}" \
     --request GET \
     http://localhost:8080/api/users/ \
     | jq -r '.teams[0]' )


curl -H 'Content-Type: application/json' \
     -H "Authorization: Bearer ${TOKEN}" \
     --request GET \
     http://localhost:8080/api/teams/${TEAM}
echo

curl -H "Authorization: Bearer ${TOKEN}" \
     -H 'Content-Type: application/json' \
     --request PUT \
     -d '{"title": "Look ma I changed it"}'\
     http://localhost:8080/api/teams/${TEAM}
echo 

echo
curl -H 'Content-Type: application/json' \
     -H "Authorization: Bearer ${TOKEN}" \
     --request GET \
     http://localhost:8080/api/teams/${TEAM}


echo 
echo

curl -H 'Content-Type: application/json' \
     -H "Authorization: Bearer ${TOKEN}" \
     --request POST \
      -d "{\"title\": \"proj1\",\"description\": \"thingy\",
          \"points\":[{\"latitude\": 28.602413253152307, \"longitude\": -70.20019937739713},
                      {\"latitude\": 20.602413253152307, \"longitude\": -81.20019937739713},
                      {\"latitude\": 38.602413253152307, \"longitude\": -81.20019937739713}],
          \"team\": \"${TEAM}\"
      }" \
     http://localhost:8080/api/projects/

echo
echo

PROJECT=$(curl -H 'Content-Type: application/json' \
     -H "Authorization: Bearer ${TOKEN}" \
     --request GET \
     http://localhost:8080/api/teams/${TEAM}  \
     | jq -r '.projects[0]._id' )

AREA=$(curl -H 'Content-Type: application/json' \
     -H "Authorization: Bearer ${TOKEN}" \
     --request GET \
     http://localhost:8080/api/projects/${PROJECT} \
     | jq -r '.subareas[0]._id' )


USER=$(curl -H "Authorization: Bearer ${TOKEN}" \
        -H 'Content-Type: application/json' \
        --request GET \
        http://localhost:8080/api/users/ \
        | jq -r '._id')
echo 
echo TEAM:
echo ${TEAM}
echo USER:
echo ${USER}
echo PROJECT:
echo ${PROJECT}
echo AREA:
echo ${AREA}
echo

curl -H 'Content-Type: application/json' \
     -H "Authorization: Bearer ${TOKEN}" \
     --request POST \
      -d "{\"owner\": \"${USER}\",  
           \"claimed\": \"true\", 
           \"area\": \"${AREA}\" , 
           \"project\": \"${PROJECT}\" , 
           \"start_time\": \"2012-04-23T18:25:43.511Z\" , 
           \"end_time\": \"2012-05-23T18:25:43.511Z\"  }"  \
     http://localhost:8080/api/stationary_maps/

echo
echo

MAP=$(curl -H 'Content-Type: application/json' \
     -H "Authorization: Bearer ${TOKEN}" \
     --request GET \
     http://localhost:8080/api/projects/${PROJECT} \
     | jq -r '.activities[0].activity')
echo
echo MAP:
echo ${MAP}
echo
curl -H 'Content-Type: application/json' \
     -H "Authorization: Bearer ${TOKEN}" \
     --request GET \
     http://localhost:8080/api/projects/${PROJECT} 

echo 
echo

curl -H 'Content-Type: application/json' \
     -H "Authorization: Bearer ${TOKEN}" \
     --request POST \
      -d "{\"area\":[{\"latitude\": 8.602413253152307, \"longitude\": -7.20019937739713},
                      {\"latitude\": 0.602413253152307, \"longitude\": -1.20019937739713},
                      {\"latitude\": 8.602413253152307, \"longitude\": -8.20019937739713}]
      }" \
     http://localhost:8080/api/projects/${PROJECT}/areas

echo 
echo
curl -H 'Content-Type: application/json' \
     -H "Authorization: Bearer ${TOKEN}" \
     --request GET \
     http://localhost:8080/api/stationary_maps/${MAP} 

echo 
echo 

curl -H 'Content-Type: application/json' \
     -H "Authorization: Bearer ${TOKEN}" \
     --request POST \
      -d  "{\"entries\":[{
           \"location\": {\"latitude\": 8.602413253152307, \"longitude\": -7.20019937739713},  
           \"age\": \"<15\", 
           \"posture\": \"sitting(informal)\" , 
           \"activity\": \"talking\" , 
           \"time\": \"2012-04-23T12:25:43.511Z\" 
          }]}"  \
     http://localhost:8080/api/stationary_maps/${MAP}/data

echo

echo
curl -H 'Content-Type: application/json' \
     -H "Authorization: Bearer ${TOKEN}" \
     --request GET \
     http://localhost:8080/api/stationary_maps/${MAP} 

echo 

MAPDATA=$(curl -H 'Content-Type: application/json' \
     -H "Authorization: Bearer ${TOKEN}" \
     --request GET \
     http://localhost:8080/api/stationary_maps/${MAP} \
     | jq -r '.data[0]._id')

echo  MAPDATA
echo ${MAPDATA}
echo
echo
curl -H 'Content-Type: application/json' \
     -H "Authorization: Bearer ${TOKEN}" \
        --request PUT \
         -d "{
           \"location\": {\"latitude\": 8.602413253152307, \"longitude\": -7.20019937739713},   
           \"posture\": \"sitting(formal)\" , 
           \"activity\": \"talking\" , 
           \"time\": \"2012-04-23T12:25:43.511Z\" 
          }"  \
     http://localhost:8080/api/stationary_maps/${MAP}/data/${MAPDATA} 

echo
echo
curl -H 'Content-Type: application/json' \
     -H "Authorization: Bearer ${TOKEN}" \
     --request GET \
     http://localhost:8080/api/stationary_maps/${MAP} 
echo
echo
curl -H 'Content-Type: application/json' \
     -H "Authorization: Bearer ${TOKEN}" \
     --request POST \
     -d '{"userEmail": "doggies@gmail.com"}' \
     http://localhost:8080/api/teams/${TEAM}/invites
echo

TOKEN=$(curl --header "Content-Type: application/json" \
      --request POST \
      -d '{"email": "doggies@gmail.com","password": "What@1234"}'\
      http://localhost:8080/api/login \
      | jq -r '.token')

echo
echo
curl -H 'Accept: application/json' \
     -H "Authorization: Bearer ${TOKEN}" \
     --request GET \
     http://localhost:8080/api/users/

echo
echo

curl -H 'Content-Type: application/json' \
     -H "Authorization: Bearer ${TOKEN}" \
     --request POST \
     -d "{\"responses\": [{\"team\": \"${TEAM}\", \"accept\": true}]}" \
     http://localhost:8080/api/users/invites/

echo
echo 

curl -H 'Accept: application/json' \
     -H "Authorization: Bearer ${TOKEN}" \
     --request GET \
     http://localhost:8080/api/users/

echo
echo

curl -H 'Content-Type: application/json' \
     -H "Authorization: Bearer ${TOKEN}" \
     --request GET \
     http://localhost:8080/api/teams/${TEAM} 

echo
echo