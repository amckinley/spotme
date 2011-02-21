<?php

function invariant($assert, $message /*, ...*/) {
	$args = func_get_args();
	$assert = array_shift($args);
	if (!$assert) {
    $message = array_shift($args);
    throw new ViolationException($message, $args);
	}
}

abstract class BaseException extends Exception {

	private $rawMessage,
					$args;

	public function __construct($message /*, ... */) {
		$args = func_get_args();
		$this->rawMessage = array_shift($args);
    if (count($args) == 1 && is_array($args)) {
      $args = $args[0];
    }
		parent::__construct(vsprintf($this->rawMessage, $args));
	}

	public function getRawMessage() {
		return $this->rawMessage;
	}

}

class ViolationException extends BaseException { }

class SystemException extends BaseException { }

interface IUserFacingError {
	
	public function getUserFacingMessage();
	
}
