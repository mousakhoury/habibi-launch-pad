<?php

namespace Database\Factories\Faker;

use Faker\Provider\Base;

class EthereumProvider extends Base
{
    public function ethereumAddress()
    {
        $hex = '0x';
        for ($i = 0; $i < 40; $i++) {
            $hex .= dechex(mt_rand(0, 15));
        }
        return $hex;
    }
}
