import { HandPalm, Play } from "phosphor-react";
import { HomeContainer, StartCountdownButton, StopCountdownButton } from "./styles";
import { useContext} from "react";
import { NewCycleForm } from "./components/NewCycleForm";
import { Countdown } from "./components/Countdown";
import {FormProvider, useForm} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';
import { CycleContext } from "../../contexts/CycleContext";


interface NewCycleFormData{
    task: string,
    minutesAmount: number,
}

export function Home(){

    const {createNewCycle, interruptCurrentCycle, activeCycle} = useContext(CycleContext);
    
    const newCycleFormValidationSchema = zod.object({
        task: zod.string().min(1, 'Informe a tarefa'),
        minutesAmount: zod.number().min(5, 'O ciclo precisa ser no maximo de 5 minutos').max(60, 'O ciclo precisa ser no maximo de 60 minutos'),
    })

    const newCycleForm = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues:{
            task: '',
            minutesAmount: 0,
        }
    });

    const { handleSubmit, watch, reset } = newCycleForm;

    function handleCreateNewCycle(data: NewCycleFormData){
        createNewCycle(data);
        reset();
    }

    const task = watch('task');    


    return(
        <HomeContainer>
            <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
                <FormProvider {...newCycleForm}>
                    <NewCycleForm/>
                </FormProvider>
                
                <Countdown/>

                {activeCycle ?
                    <StopCountdownButton onClick={interruptCurrentCycle} type="button">
                        <HandPalm size={24}/>
                        Interromper
                    </StopCountdownButton>
                : 
                    <StartCountdownButton type="submit" disabled={!task}>
                        <Play size={24}/>
                        Começar
                    </StartCountdownButton>
                }
            </form>
        </HomeContainer>
    )
}