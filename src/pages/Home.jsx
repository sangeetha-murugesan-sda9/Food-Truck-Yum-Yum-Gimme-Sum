import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMenu } from '../features/menu/menuSlice';
import MenuItem from '../features/menu/Menu';
import { fetchApiKey, registerTenant } from '../features/tenant/tenantSlice';

function Home() {

const dispatch = useDispatch();

const { items = [], status, error } = useSelector(state => state.menu);

const { apiKey, tenantId, status: tenantStatus } = useSelector(state => state.tenant);

useEffect(() => {

if (!apiKey && tenantStatus !== 'loading') {

dispatch(fetchApiKey());

}

}, [apiKey, tenantStatus, dispatch]);

useEffect(() => {

if (apiKey && !tenantId && tenantStatus !== 'loading') {

dispatch(registerTenant(`MyFoodTruck-${Math.random().toString(36).substring(2, 8)}`));

}

}, [apiKey, tenantId, tenantStatus, dispatch]);



useEffect(() => {

if (apiKey && tenantId && status === 'idle') {

dispatch(fetchMenu());

}

}, [apiKey, tenantId, status, dispatch]);

if (tenantStatus === 'loading' || status === 'loading') {

return <div className="text-center py-12">Loading...</div>;

}

if (tenantStatus === 'failed') {

return <div className="text-center py-12 text-red-500">Tenant Error: {error}</div>;

}

if (status === 'failed') {

return <div className="text-center py-12 text-red-500">Menu Error: {error}</div>;

}

return (

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

{Array.isArray(items) && items.length > 0 ? (

items.map(item => (

<MenuItem key={item.id} item={item} />

))

) : (

<div className="col-span-full text-center py-12">

No menu items available

</div>

)}

</div>

);

}

export default Home;