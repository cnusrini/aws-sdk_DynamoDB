// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set the region
AWS.config.update({region: 'us-east-1'});
var apiVersion = {apiVersion: '2012-08-10'};
var dynamoObj = new AWS.DynamoDB(apiVersion);

function createDB(){
/*
  AWS.config.update({region: 'us-east-1'});
  var apiVersion = {apiVersion: '2012-08-10'};
  var dynamoObj = new AWS.DynamoDB(apiVersion);
  */
  var params = {
    AttributeDefinitions: [
    {
      AttributeName: 'CUSTOMER_ID',
      AttributeType: 'N'
    },
    {
      AttributeName: 'CUSTOMER_NAME',
      AttributeType: 'S'
    }
  ],
  KeySchema: [
    {
      AttributeName: 'CUSTOMER_ID',
      KeyType: 'HASH'
    },
    {
      AttributeName: 'CUSTOMER_NAME',
      KeyType: 'RANGE'
    }
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 1,
    WriteCapacityUnits: 1
  },
  TableName: 'CUSTOMER_Details3',
  StreamSpecification: {
    StreamEnabled: false
  }

  };

  dynamoObj.createTable(params, function(sucess, failure){
    if(sucess){
      console.log('sucess', sucess);
      listTable();
    }
    else {
      console.log('failure', failure);
      listTable();
    }
  });

}
function listTable(){
// Call DynamoDB to retrieve the list of tables
  dynamoObj.listTables({Limit: 10}, function(sucess, failure) {
      if(failure){
    console.log("failure", failure.code);
  } else {
    console.log("Table names is/are ", sucess.TableNames);
  }
});
}
function describeTable(){
  var params = {
  TableName: process.argv[2]
};
// Call DynamoDB to retrieve the selected table descriptions
dynamoObj.describeTable(params, function(sucess, failure) {
  if (failure) {
    console.log("failure", failure);
  } else {
    console.log("Success", sucess.Table.KeySchema);
  }
});
}

createDB();
