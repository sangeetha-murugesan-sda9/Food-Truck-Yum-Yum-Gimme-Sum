import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMenu } from '../features/menu/menuSlice';
import MenuItem from '../features/menu/Menu';
import { fetchApiKey, registerTenant } from '../features/tenant/tenantSlice';
import logo from '../assets/logo.png'; 
import backgroundImage from '../assets/background.png';

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

  
   return (
    <div 
      className="min-h-screen"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        backgroundRepeat: 'no-repeat'
      }}
    >
    
      <header className="Logo fixed top-0 left-0 right-0 z-10 bg-gradient-to-b from-green-900 to-green-800 p-4 flex justify-between items-center shadow-lg">
       <img 
        src={logo} 
        alt="Yum Yum Gimme Sum Logo" 
        className="w-16 h-16 object-contain rounded-lg border-4 border-white shadow-inner"
        />
        
      </header>

      <main className="container mx-auto px-4 pt-24 pb-6 justigy-center">

        <div className="text-center mb-8 title">
          <h1 className="text-5xl font-bold text-white font-outline tracking-tight">MENY</h1>
        </div>
        
        {tenantStatus === 'loading' || status === 'loading' ? (
          <div className="text-center py-12 text-white bg-gray-800 bg-opacity-70 rounded-xl p-8 max-w-md mx-auto">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
            Loading menu...
          </div>
        ) : tenantStatus === 'failed' ? (
          <div className="text-center py-12 text-red-300 bg-gray-800 bg-opacity-80 rounded-xl p-6 max-w-md mx-auto">
            <span className="text-xl block mb-2"></span>
            Tenant Error: {error}
          </div>
        ) : status === 'failed' ? (
          <div className="text-center py-12 text-red-300 bg-gray-800 bg-opacity-80 rounded-xl p-6 max-w-md mx-auto">
            <span className="text-xl block mb-2"></span>
            Menu Error: {error}
          </div>
        ) : (
   
        <div className="menu-item-card rounded-xl px-1 py-1 max-w-xl w-full mx-auto">

  <div className="flex flex-col items-center">
    {Array.isArray(items) && items.length > 0 ? (
      items.map(item => <MenuItem key={item.id} item={item} />)
    ) : (
      <div className="text-center py-12 text-white">
        No menu items available
      </div>
    )}
  </div>
</div>

        )}
      </main>

      <footer className="py-6 text-center text-white text-opacity-80 text-sm">
        <p>© {new Date().getFullYear()} Yum Yum Gimme Sum</p>
      </footer>
    </div>
  );
}

export default Home;