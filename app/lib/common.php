<?php
    /**
     * Gets the root path of the project
     *
     * @return string
     */
    function getRootPath() {
        return realpath(__DIR__ . '/../../');
    }
