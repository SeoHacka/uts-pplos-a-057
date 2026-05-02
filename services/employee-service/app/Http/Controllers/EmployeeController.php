<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class EmployeeController extends Controller
{
    // GET /api/employees (Includes Filtering & Paging)
    public function index(Request $request)
    {
        $query = Employee::query();

        // Filtering by position (if provided)
        if ($request->has('position')) {
            $query->where('position', 'like', '%' . $request->position . '%');
        }

        // Pagination (Default 10 per page)
        $employees = $query->paginate($request->get('per_page', 10));

        return response()->json($employees, 200);
    }

    // POST /api/employees (Validation)
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:employees',
            'position' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $employee = Employee::create($request->all());
        return response()->json($employee, 201);
    }

    // GET /api/employees/{id}
    public function show($id)
    {
        $employee = Employee::find($id);
        if (!$employee) return response()->json(['message' => 'Not Found'], 404);
        return response()->json($employee, 200);
    }
}