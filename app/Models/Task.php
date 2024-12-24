<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Task extends Model
{
    use HasFactory;

    protected $fillable = [ 'user_id', 'title', 'description', 'due_date', 'status' ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}