import { ReactNode, createContext, useState } from "react";

interface CreateCycleData{
    task: string
    minutesAmount: number
}

interface Cycle{
    id: string,
    task: string,
    minutesAmount: number,
    startDate: Date,
    interruptedDate?: Date,
    finishedDate?: Date,
}

interface CyclesContextType{
    cycles: Cycle[];
    activeCycle: Cycle | undefined;
    activeCycleId: string | null;
    markCurrentCycleAsFinished: () => void;
    amountSecondsPassed: number;
    setSecondsPassed: (seconds:number) => void;
    createNewCycle: (data: CreateCycleData) => void;
    interruptCurrentCycle: () => void;
}

export const CycleContext = createContext({} as CyclesContextType)

interface CyclesContextProviderProps{
    children: ReactNode
}

export function CycleContextProvider({children } : CyclesContextProviderProps){

    const [cycles, setCycles] = useState<Cycle[]>([]);
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

    const activeCycle = cycles.find((cycle) => cycle.id == activeCycleId);

    function setSecondsPassed(seconds: number){
        setAmountSecondsPassed(seconds);
    }
    
    function markCurrentCycleAsFinished(){
        setCycles(cycles.map((cycle) => {
            if(cycle.id == activeCycleId){
                return{...cycle, finishedDate: new Date()}
            }else{
                return cycle
            }
        }))
    }

    function createNewCycle(data:CreateCycleData){
        
        const newCycle: Cycle = {
            id: String(new Date().getTime()),
            task: data.task,
            minutesAmount: data.minutesAmount,
            startDate: new Date()
        }

        //setCycles([...cycles, newCycle]);
        setCycles((state) => [...state, newCycle]);
        setActiveCycleId(newCycle.id);
        setAmountSecondsPassed(0);
    }

    function interruptCurrentCycle(){
        
        setCycles(cycles.map((cycle) => {
            if(cycle.id == activeCycleId){
                return{...cycle, interruptedDate: new Date()}
            }else{
                return cycle
            }
        }))

        setActiveCycleId(null);
    }

    return(
        <CycleContext.Provider 
            value={{
                cycles,
                activeCycle, 
                activeCycleId, 
                markCurrentCycleAsFinished, 
                amountSecondsPassed, 
                setSecondsPassed,
                createNewCycle,
                interruptCurrentCycle
            }}>    
            {children}
        </CycleContext.Provider>
    )
}