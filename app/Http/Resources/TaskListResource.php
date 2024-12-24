<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TaskListResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => Str::limit($this->title, 10, '...'),
            'description' => Str::limit($this->description, 50, '...'),
            'due_date' => Carbon::parse($this->due_date)->format('d M, Y'), //H:i:s
            'status' => $this->status,
        ];
    }
}
