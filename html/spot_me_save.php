<?php
if (!empty($_POST['amount'])){
  $amount = $_POST['amount'];
  $friends_involved = $_POST['friends_involved'];
  $file_handle = fopen('/tmp/debt.test.db','a');
  $a = array();
  $a['amount'] = $amount;
  $a['friends_involved'] = $friends_involved;

  $debt = json_encode($a);
  fwrite($file_handle, sprintf("%s\n",$debt));
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
