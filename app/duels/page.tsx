import { createClient } from '@/lib/supabase/server'
import DuelLobby from '@/components/DuelLobby' // we need to create this

export default async function DuelsPage() {
  const supabase = createClient()
  const { data: duels } = await supabase.from('duels').select('*, challenger:challenger_id(full_name), opponent:opponent_id(full_name)').eq('status', 'waiting')

  return (
    <div className="min-h-screen bg-slate-950 p-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-black text-amber-400 mb-8">Live Duels</h1>
        <DuelLobby duels={duels || []} />
      </div>
    </div>
  )
}
