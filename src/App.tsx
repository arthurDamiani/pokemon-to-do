import { QueryClient, QueryClientProvider } from 'react-query'
import PokemonList from './PokemonList'
import { ReactQueryDevtools } from 'react-query/devtools'
import { PokemonListContextProvider } from './contexts/PokemonList.context'

const queryClient = new QueryClient()

function App() {

  return (
    <PokemonListContextProvider>
      <QueryClientProvider client={queryClient}>
        <PokemonList />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </PokemonListContextProvider>
  )
}

export default App
