<?php

$_SERVER['PHP_ROOT'] = realpath(dirname(__FILE__).'/../../../..');
require_once $_SERVER['PHP_ROOT'].'/lib/Lib.php';

class ExceptionTest extends PHPUnit_Framework_TestCase {

  public static function setUpBeforeClass() {
    Lib::init(LibContext::UNIT_TEST);
    Lib::module('core/exception');
  }

  public function testFormattingStrings() {
    $e = new ViolationException('Is this %s? %d', 'Sparta', 1);
    $this->assertEquals('Is this Sparta? 1', $e->getMessage());
    $this->assertEquals('Is this %s? %d', $e->getRawMessage());
  }

  public function testInvariantPass() {
    $thrown = false;
    try {
      invariant(true, 'This should not fatal');
    } catch (Exception $e) {
      $thrown = true;
    }
    $this->assertFalse($thrown, 'No exception should have been thrown');
  }

  public function testInvariantFailed() {
    $ex = null;
    try {
      invariant(false, 'We failed a %s test', 'trivial');
    } catch (Exception $e) {
      $ex = $e;
    }
    $this->assertTrue($ex instanceof ViolationException, 
                      'Should have thrown ViolationException');
    $this->assertEquals($ex->getMessage(), 'We failed a trivial test');
    $this->assertEquals($ex->getRawMessage(), 'We failed a %s test');
  }

}
