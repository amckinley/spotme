<?php

$_SERVER['PHP_ROOT'] = realpath(dirname(__FILE__).'/../..');
require_once $_SERVER['PHP_ROOT'].'/lib/Lib.php';

class LibTest extends PHPUnit_Framework_TestCase {

  public static function setUpBeforeClass() {
    Lib::init(LibContext::UNIT_TEST);
  }
	
	protected function setUp() {
		Lib::resetDuringUnitTesting();
	}
	
	public function testInitValidContext() {
		Lib::init(LibContext::WEB);
		$this->assertEquals(Lib::getContext(),
                        LibContext::WEB,
                        'Incorrect context');
	}
	
	/**
	 * @expectedException LibException
	 */
	public function testInitInvalidContext() {
		Lib::init('INVALID_CONTEXT');
	}	
	
	/**
	 * @expectedException LibException
	 */
	public function testDoubleInitSameContext() {
		Lib::init(LibContext::WEB);
		Lib::init(LibContext::WEB);
	}	

	/**
	 * @expectedException LibException
	 */
	public function testDoubleInitDifferentContext() {
		Lib::init(LibContext::WEB);
		Lib::init(LibContext::UNIT_TEST);
	}

  /**
	 * @expectedException LibException
   */
  public function testInvalidModule() {
    Lib::module('this/does/not/exist');
  }

  public function testValidModule() {
    Lib::init(LibContext::UNIT_TEST);
    Lib::module('core/exceptions');
    $modules = Lib::getLoadedModules();
    $this->assertEquals(array('core/exceptions' => 1), Lib::getLoadedModules());
    Lib::module('core/exceptions');
    $modules = Lib::getLoadedModules();
    $this->assertEquals(array('core/exceptions' => 2), Lib::getLoadedModules());
  }

  /**
	 * @expectedException LibException
   */
  public function testInvalidFile() {
    Lib::module('this/does/not/exist');
  }

}
