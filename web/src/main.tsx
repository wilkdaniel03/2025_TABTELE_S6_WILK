import React from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';

// const queryClient = new QueryClient();

const el = document.getElementById("root");
if (!el) throw new Error("Failed to find element with id root");

createRoot(el).render(
	<ChakraProvider value={defaultSystem}>
		<App/>
	</ChakraProvider>
);
