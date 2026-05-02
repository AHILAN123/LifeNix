import { useState } from "react";

type Toast={id:string;title?:string;description?:string};

export function useToast(){
  const [toasts,setToasts]=useState<Toast[]>([]);

  function toast(data:Omit<Toast,"id">){
    const id=crypto.randomUUID();
    setToasts(t=>[...t,{id,...data}]);
    setTimeout(()=>setToasts(t=>t.filter(x=>x.id!==id)),3000);
  }

  function dismiss(id:string){
    setToasts(t=>t.filter(x=>x.id!==id));
  }

  return{toasts,toast,dismiss};
}