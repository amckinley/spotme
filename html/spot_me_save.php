<?php
print_r($_POST);
if (!empty($_POST['data'])){
  $file_handle = fopen('/tmp/debt.test.db','a');
  $a = array();
  $a['data'] = $_POST['data'];;
  $debt = json_decode($a['data'], true);
  
  $amount = $debt['amount'];
  $friends_involved = json_decode($debt['friends_involved'], true);

  $amount_to_split = $amount / (count($friends_involved) + 1);

  foreach ($friends_involved as $friend_involved){
    $new_debt = array(
      "uuid1" => $debt['uuid1'],
      "uuid2" => $friend_involved,
      "amount" => $amount_to_split,
    );
    $connection = mysql_connect('localhost','spotme','wang');
    $insert_statement = sprintf("insert into spotme.running_debt (uid1, uid2, amount) values('%s','%s','%s')",
      mysql_real_escape_string($new_debt['uuid1']),
      mysql_real_escape_string($new_debt['uuid2']),
      mysql_real_escape_string($new_debt['amount'])
    );
    $result = mysql_query($insert_statement);
    if (!$result){
      die(mysql_error());
    }
  } 

  fwrite($file_handle, sprintf("%s\n",json_encode($debt)));
  fclose($file_handle);
} else {
  $file_read_handler = fopen('/tmp/debt.test.db','r');
  $count = 0;
  $contents = array();
  while ($content = fscanf($file_read_handler , "%s \n")){
    $contents["$count"] = $content[0]; 
    $count++;
  } 
  print_r(json_encode($contents));
  fclose($file_read_handler);
}
