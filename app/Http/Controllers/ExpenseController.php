<?php

namespace App\Http\Controllers;

use App\Expense;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Tymon\JWTAuth\Facades\JWTAuth as FacadesJWTAuth;

class ExpenseController extends Controller
{

    public function __construct()
    {
        $this->middleware('jwt');
     
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {   
      
         $user = auth()->userOrFail();
         $data = Expense::where("user_id",$user->id)->paginate(5);
    
         return response()->json($data);
        
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $user = auth()->userOrFail();
        $validator = Validator::make($request->json()->all(), [
            'title' => 'required|max:255',
            'amount' => 'required|numeric',
            'description' => 'required',
            'date' => 'required',
            
        ]);
        
        if ($validator->fails()) {
            return response()->json($validator->errors()->toJson(),400);
        }
        $expense = Expense::create([
            'title'=>request()->json()->get('title'),
            'amount'=>request()->json()->get('amount'),
            'date'=>request()->json()->get('date'),
            'description'=>request()->json()->get('description'),
             'user_id'=> $user->id,
        ]);

        return response()->json(compact('expense'),201);
        
      

  
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Expense  $expense
     * @return \Illuminate\Http\Response
     */
    public function show(Expense $expense)
    {   $user = auth()->userOrFail();
        $data=Expense::where("user_id",$user->id)->find($expense->id);
        if($data==null){
            return response()->json(["Error Message"=>"No data exist or unauthorized"],403);
        }else{
            return response()->json($data,201);
        }
  
    }

    public function getDataExpense(Request $request)
    {   
        
        $user = auth()->userOrFail();
     
        $data=Expense::select(DB::raw('sum(amount) as amount'),DB::raw("DATE_FORMAT(date,'%M') as month"))
        ->where("user_id",$user->id)->whereYear('date',$request->yearNow)->groupBy('date')->get();
        
        if($data==null){
            return response()->json(["Error Message"=>"No data exist or unauthorized"],403);
        }else{
          
        
       
            return response()->json($data,201);
        }
  
    }

  

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Expense  $expense
     * @return \Illuminate\Http\Response
     */
    public function edit(Expense $expense)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Expense  $expense
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Expense $expense)
    {
        $user = auth()->userOrFail();
        $data = Expense::where("user_id",$user->id)->findorFail($expense->id);

        $validator = Validator::make($request->json()->all(), [
            'title' => 'required|max:255',
            'amount' => 'required|numeric',
            'description' => 'required',
            'date' => 'required',
            
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(),400);
        }

        $data->title=$request->get("title");
        $data->description=$request->get("description");
        $data->date=$request->get("date");
        $data->amount=$request->get("amount");
        $data->save();

        return response()->json(["Message"=>"successful","data"=>$data],200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Expense  $expense
     * @return \Illuminate\Http\Response
     */
    public function destroy(Expense $expense)
    {
        $user = auth()->userOrFail();
        $data=Expense::where("user_id",$user->id)->findorFail($expense->id);
         $data->delete();
        return response()->json(["message"=>$data],200);
    }
}
