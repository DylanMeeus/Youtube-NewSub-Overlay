<?php
/**
 * Created by PhpStorm.
 * User: Dylan
 * Date: 8/01/2016
 * Time: 21:30
 */

require_once 'php/core/MailClient.php';

class Servlet
{

    private $mailClient;

    public function __construct()
    {
        $this->mailClient = new MailClient();
    }


    public function processRequest()
    {
        $this->redirect = false;
        $action = "";
        if(isset($_GET['action']))
        {
            $action = $_GET['action'];
        }

        if($action=='readmails')
        {
            echo $this->mailClient->getMail();
        }
    }
}