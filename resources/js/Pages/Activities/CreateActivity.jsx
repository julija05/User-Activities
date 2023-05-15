import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { router } from '@inertiajs/core';
import { Head, useForm } from '@inertiajs/react';
import moment from 'moment';

export default function CreateActivity({ auth }) {
    const today = new Date().toISOString().substr(0, 10); // Get today's date in the format "YYYY-MM-DD"
    const { data, setData, post, processing, errors, reset } = useForm({
        activityDateFrom: '',
        activityTimeSpend: '',
        activityDescription: '',
        user_id: auth.user.id,
    });
    

    const submit = (e) => {
        e.preventDefault();
        data.activityDateFrom= moment(data.activityDateFrom).format("yyyy-MM-DD");
        post(route('activities.store'));
        
    };
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Create Activity</h2>}
        >
            <Head title="CreateActivity" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    </div>
                </div>
            </div>
            <form  onSubmit={submit}>
            <div class=" sm:flex sm:flex-row sm:justify-center sm:items-center ">
                <div className="py-12 m-4">
                    <div className="">
                    <InputLabel htmlFor="date" value="Activity From" /> 
                    <input min={today}
                     id="activityDateFrom"
                     name="activityDateFrom"
                     type="date"
                     value={data.activityDateFrom}
                     onChange={(e) => setData('activityDateFrom', e.target.value)}
                    />
                    </div>
                </div>
                <div className="py-12 m-4">
                    <div className="">
                    <InputLabel htmlFor="date" value="Time Spend" /> 
                    <input 
                     id="activityTimeSpend"
                     type="time"
                     value={data.activityTimeSpend}
                     onChange={(e) => setData('activityTimeSpend', e.target.value)}
                    />
                    </div>
                </div>    
            </div>
            <div class=" sm:flex sm:flex-col sm:justify-center sm:items-center">
            <InputLabel htmlFor="date" value="Description" />    
            <TextInput
             id="activityDescription"
             value={data.activityDescription}
             onChange={(e) => setData('activityDescription', e.target.value)}
             />
            <PrimaryButton className='mt-5'>Create</PrimaryButton>
            </div>
            </form>  
        </AuthenticatedLayout>
    );
}
