<?php

if (!empty($_GET['amount'])){
  $amount = $_GET['amount'];
  $file_handle = fopen('/tmp/debt.test.db','a');
  $debt_test_db = $amount;
  fwrite($file_handle, sprintf("%s\n",$debt_test_db));
  fflush($file_handle);
  fclose($file_handle);
}
