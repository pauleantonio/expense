<?php

use App\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user = new User();
        $user->name="Antonio";
        $user->password=Hash::make("123") ;
        $user->email="asd@asd.com";
        $user->save();

        $user = new User();
        $user->name="Beats";
        $user->password=Hash::make(123) ;
        $user->email="dsa@asd.com";
        $user->save();
    }
}
