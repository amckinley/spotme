<?php

$connection = mysql_connect('localhost','spotme','wang');
$query = 'select * from spotme.running_debt';
$results = mysql_query($query);
if(!$results){
  die(mysql_error());
}

$json_output = array();
while($result_list = mysql_fetch_assoc($results)){
  $json_output[] = $result_list;
} 
print(json_encode($json_output));
