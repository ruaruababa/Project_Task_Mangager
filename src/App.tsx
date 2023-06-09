import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {useState} from 'react';
import {RouterProvider} from 'react-router-dom';
import LoginPage from './components/LoginPage';
import router from './router';
import {getAccessToken} from './utils/auth';
import Pusher from 'pusher-js';

function App() {
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        staleTime: 1000 * 1000,
                        retry: 0,
                    },
                },
            }),
    );
    
    const pusher = new Pusher("APP_KEY", {
      cluster: "APP_CLUSTER"
     });
    const channel = pusher.subscribe('votes');
    // channel.bind('vote-event', function(data) {
    //   return data
    //  });

    const accessToken = getAccessToken();
    return (
        <div className="App">
            <QueryClientProvider client={queryClient}>
                {!accessToken ? (
                    <LoginPage />
                ) : (
                    <RouterProvider router={router} />
                )}
            </QueryClientProvider>
        </div>
    );
}

export default App;
