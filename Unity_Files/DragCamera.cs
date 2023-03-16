using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class DragCamera : MonoBehaviour {
    [SerializeField] private Camera cam;
    [SerializeField] private Vector3 target;
    // Transform center = new Vector3(0,0,0);
    [SerializeField] private float distanceToTarget = 10;
    private float tracker;

    private Vector3 previousPosition;

    private void Update()
    {
        target = GameObject.FindGameObjectsWithTag("Model")[0].GetComponent<MeshRenderer>().bounds.center;
        if (Input.GetMouseButtonDown(0))
        {
            previousPosition = cam.ScreenToViewportPoint(Input.mousePosition);
        }
        else if (Input.GetMouseButton(0) || Input.mouseScrollDelta.y != 0)
        {
            
            Vector3 newPosition = cam.ScreenToViewportPoint(Input.mousePosition);
            Vector3 direction = previousPosition - newPosition;

            float rotationAroundYAxis = -direction.x * 180; // camera moves horizontally
            float rotationAroundXAxis = direction.y * 180; // camera moves vertically

            cam.transform.position = target;

            cam.transform.Rotate(new Vector3(1, 0, 0), rotationAroundXAxis);
            cam.transform.Rotate(new Vector3(0, 1, 0), rotationAroundYAxis, Space.World);

            if (distanceToTarget - Input.mouseScrollDelta.y != 0) distanceToTarget -= Input.mouseScrollDelta.y;

            // Debug.Log(Input.mouseScrollDelta);
            cam.transform.Translate(new Vector3(0, 0, -distanceToTarget));
            previousPosition = newPosition;
        }
        

        
        
    }
}

