import json
import boto3

# Create a DynamoDB object using the AWS SDK
dynamodb = boto3.resource('dynamodb')
# Use the DynamoDB object to select our table
table = dynamodb.Table('EmployeeDetails')

# Define the handler function that the Lambda service will use as an entry point
def lambda_handler(event, context):
    # Extract values from the event object we got from the Lambda service and store in variables
    employee_id = event['employee_id']
    employee_name = event['employee_name']
    department = event['department']
    salary = event['salary']
    dob = event['dob']
    
    # Write student data to the DynamoDB table and save the response in a variable
    response = table.put_item(
        Item={
            'employee_id': employee_id,
            'employee_name': employee_name,
            'department': department,
            'salary': salary,
            'dob': dob
        }
    )
    
    # Return a properly formatted JSON object
    return {
        'statusCode': 200,
        'body': json.dumps('EmployeeDetails saved successfully!')
    }
