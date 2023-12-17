<?php

$conn = mysqli_connect("mysql-epicureanrecipes.alwaysdata.net", "334101", "******", "epicureanrecipes_database");

if (!$conn) {
    echo "Connection Failed";
}