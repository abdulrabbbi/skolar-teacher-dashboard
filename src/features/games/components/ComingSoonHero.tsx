
import { Sparkles, Trophy, Zap } from 'lucide-react';
import Button from '../../../shared/components/ui/Button';
import Card from '../../../shared/components/ui/Card';

export default function ComingSoonHero() {
  return (
    <Card className="overflow-hidden bg-gradient-to-r from-emerald-500 via-emerald-400 to-lime-400 p-6 text-white sm:p-8">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-center">
        <div className="order-1 flex-1 space-y-5">
          <span className="inline-flex w-fit items-center rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider">
            Coming Soon
          </span>

          <div className="space-y-3">
            <h2 className="text-3xl font-semibold leading-tight sm:text-4xl">
              Games are coming to SKOLAR
            </h2>
            <p className="max-w-xl text-sm text-white/90 sm:text-base">
              Master your subjects with SKOLAR-level learning. Teacher-led live
              games that target the exact topics students need most.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full bg-yellow-300 px-3 py-1 text-xs font-semibold text-slate-900">
              <Zap className="h-4 w-4" />
              Built from your topics
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-pink-300 px-3 py-1 text-xs font-semibold text-slate-900">
              <Trophy className="h-4 w-4" />
              Live Leaderboards
            </span>
          </div>

          <ul className="space-y-2 text-sm text-white/90">
            <li>Built for classrooms � Curriculum-aligned content</li>
            <li>Real progress tracking � See improvement in real-time</li>
            <li>Engaging format � Learning that feels like playing</li>
          </ul>

          <Button
            className="w-full bg-yellow-300 text-slate-900 hover:bg-yellow-400 sm:w-auto"
          >
            Notify me when Games launches
          </Button>
        </div>

        <div className="order-2 flex flex-1 items-center justify-center lg:justify-end">
          <div className="relative h-56 w-56 sm:h-64 sm:w-64">
            <div className="absolute inset-4 rounded-full bg-green-500 shadow-2xl" />
            <div className="absolute left-1/2 top-10 h-7 w-7 -translate-x-8 rounded-full bg-white" />
            <div className="absolute left-1/2 top-10 h-7 w-7 translate-x-1 rounded-full bg-white" />
            <div className="absolute left-1/2 top-12 h-2.5 w-2.5 -translate-x-6 rounded-full bg-green-700" />
            <div className="absolute left-1/2 top-12 h-2.5 w-2.5 translate-x-3 rounded-full bg-green-700" />
            <div className="absolute -bottom-3 left-6 h-10 w-10 rounded-full bg-green-400/80" />
            <div className="absolute -bottom-6 left-20 h-12 w-12 rounded-full bg-green-400/70" />
            <div className="absolute -bottom-4 right-12 h-9 w-9 rounded-full bg-green-400/70" />

            <div className="absolute -left-6 top-8 rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white shadow-lg">
              ? Streak +900
            </div>
            <div className="absolute -right-4 bottom-10 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-900 shadow-lg">
              ?? Rank 2450
            </div>
            <div className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
              <Sparkles className="h-5 w-5" />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
