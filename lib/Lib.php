<?php

class LibContext {

	const WEB = 1;
	const UNIT_TEST = 2;	
	
}

final class Lib {

	private static $moduleStack = array(),
                 $loadedModules = array(),
                 $context = null,
                 $isRunningTests = false;
	
  public static function init($context) {		
    if (self::$context !== null) {
      throw new LibException(
        sprintf("Lib::init() was previously called with context `%d'", 
                self::$context)
      );
    }

		switch ($context) {
			case LibContext::WEB:
				break;
			case LibContext::UNIT_TEST:
        self::$isRunningTests = true;
        break;
			default:
				throw new LibException(sprintf("Unknown Lib context: `%s'", $context));
		}
	
		self::$context = $context;
	}
	
	public static function module($module) {
    if (self::$context === null) {
      throw new LibException('Lib::init() was never called');
    }
	
    $module = trim($module, '/');
		if (isset(self::$loadedModules[$module])) {
			self::$loadedModules[$module]++;
			return;
		}
		
		$path = $_SERVER['PHP_ROOT'].'/lib/'.$module.'/__init__.php';		
		if (!file_exists($path)) {
      throw new LibException(
        sprintf("Cannot find module: `%s' tried path: `%s'", 
							  $module, $path)
      );
    }

    if (count(self::$moduleStack) > 10) {
      throw new LibException(
        sprintf('Lib tried to load a module chain > 10 deep: %s',
                implode(' => ', self::$moduleStack))
      );
    }

    array_push(self::$moduleStack, $module);
    require_once($path);
    array_pop(self::$moduleStack);

		self::$loadedModules[$module] = 1;
	}

	public static function file($file) {
    $module = end(self::$moduleStack);
    if (!$module) {
      throw new LibException(
        'Lib::init() called from outside an __init__.php file'
      );
    }
   
    $path = sprintf('%s/lib/%s/%s', $_SERVER['PHP_ROOT'], $module, $file);
    if (!file_exists($path)) {
      throw new LibException(
        sprintf("Cannot find file: `%s'", $path) 
      );
    }
		require_once($path);
	}

  public static function getLoadedModules() {
    return self::$loadedModules;
  }
  
  public static function getContext() {
		if (self::$context === null) {
      throw new LibException('Lib::init() was never called');
    }
    return self::$context;
  }

  public static function assertInUnitTest() {
		if (!self::$isRunningTests) {
      throw new LibException('Only available in when running in a unit test');
    }
  }

	public static function resetDuringUnitTesting() {
    self::assertInUnitTest(); 
    self::$loadedModules = array();
		self::$context = null; 
	}

}

class LibException extends Exception { }
