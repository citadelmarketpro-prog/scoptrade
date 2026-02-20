"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  Plus,
  Minus,
  Users,
  Clock,
  Wallet,
  ArrowUpFromLine,
  TrendingUp,
  TrendingDown,
  ChevronDown,
} from "lucide-react";

interface BalanceCardProps {
  balance: number;
  availableBalance: number;
  totalDeposits: number;
  totalWithdrawals: number;
  totalProfits: number;
  isVerified: boolean;
  onDeposit: () => void;
  onWithdraw: () => void;
  onHistory: () => void;
}

export default function BalanceCard({
  balance,
  availableBalance,
  totalDeposits,
  totalWithdrawals,
  totalProfits,
  isVerified,
  onDeposit,
  onWithdraw,
  onHistory,
}: BalanceCardProps) {
  const profitPercent =
    totalDeposits > 0 ? (totalProfits / totalDeposits) * 100 : 0;
  const isProfitPositive = totalProfits >= 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-4"
    >
      {/* Balance Overview Card */}
      <div className="rounded-2xl bg-white/90 dark:bg-[#1a2744]/80 backdrop-blur-xl border border-gray-200/50 dark:border-white/10 shadow-lg p-5">
        <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
          Balance Overview
        </h3>

        {/* Blue Gradient Balance Card */}
        <div
          className="relative rounded-2xl overflow-hidden min-h-[360px] sm:min-h-[300px] lg:min-h-[320px]"
          style={{
            background:
              "linear-gradient(135deg, #1a4fd6 0%, #1535a8 40%, #0c1e72 100%)",
          }}
        >
          {/* Gold grid overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(rgba(251,191,36,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(251,191,36,0.1) 1px, transparent 1px)",
              backgroundSize: "30px 30px",
            }}
          />

          {/* Gold ambient light — spread across the whole card */}
          <div className="absolute -top-10 -right-10 w-72 h-72 rounded-full bg-yellow-400/15 blur-3xl pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-40 rounded-full bg-yellow-500/8 blur-3xl pointer-events-none rotate-12" />
          <div className="absolute -bottom-8 -left-8 w-52 h-52 rounded-full bg-yellow-400/10 blur-3xl pointer-events-none" />
          <div className="absolute top-0 left-0 w-36 h-36 rounded-full bg-yellow-300/8 blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 w-40 h-24 rounded-full bg-yellow-400/10 blur-2xl pointer-events-none" />

          {/*
            Wallet: absolute on the CARD (not inside the text padding div).
            Mobile  → pinned to bottom-right so it never covers the balance text.
            sm+     → floats at top-right where the balance text overlaps it.
          */}
          <div className="absolute right-0 bottom-10 sm:bottom-auto sm:top-4 w-36 sm:w-44 lg:w-56 flex items-center justify-center pointer-events-none">
            {/* Sparkles */}
            <span className="absolute top-0 right-2 text-yellow-300 text-sm leading-none select-none">
              ✦
            </span>
            <span className="absolute top-6 right-10 text-yellow-200/50 text-[7px] leading-none select-none">
              ✦
            </span>
            <span className="absolute bottom-1 right-1 text-yellow-300/40 text-[9px] leading-none select-none">
              ✦
            </span>
            <span className="absolute bottom-8 left-0 text-blue-300/30 text-[7px] leading-none select-none">
              ✦
            </span>
            <ChevronDown className="absolute bottom-2 left-3 w-4 h-4 text-white/15" />
            <ChevronDown className="absolute bottom-5 left-5 w-3 h-3 text-white/10" />

            {/* Wallet with golden glow */}
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative"
            >
              <div className="absolute inset-0 bg-yellow-400/25 blur-xl rounded-full scale-125" />
              <Image
                src="/images/gold_wallet.png"
                alt="Gold Wallet"
                width={200}
                height={200}
                className="relative object-contain w-full h-auto"
                style={{
                  filter: "drop-shadow(0 12px 28px rgba(251, 191, 36, 0.55))",
                  transform: "rotate(-8deg) translateX(4px)",
                }}
              />
            </motion.div>
          </div>

          {/* Inner padding */}
          <div className="relative p-3 py-5 lg:p-5">
            {/* Top row: brand + status */}
            <div className="mb-5">
              <div className="flex flex-col gap-1.5">
                <span className="text-[9px] font-black text-white/50 uppercase tracking-[0.25em]">
                  ScopTrade
                </span>
                <span
                  className={`inline-flex items-center gap-1.5 text-[9px] font-semibold px-2 py-0.5 rounded-full border w-fit ${
                    isVerified
                      ? "bg-emerald-500/15 border-emerald-400/30 text-emerald-300"
                      : "bg-yellow-500/15 border-yellow-400/30 text-yellow-300"
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      isVerified ? "bg-emerald-400" : "bg-yellow-400"
                    }`}
                  />
                  {isVerified ? "Verified" : "Pending Verification"}
                </span>
              </div>
            </div>

            {/* Balance + profit — text floats on top of wallet image */}
            <div>
              <p
                className="text-[9px] font-semibold text-blue-200/80 uppercase tracking-widest mb-1"
                style={{ textShadow: "0 1px 8px rgba(0,0,0,0.8)" }}
              >
                Total Balance
              </p>
              <p
                className="text-2xl sm:text-[28px] font-extrabold text-white tracking-tight font-mono leading-none"
                style={{
                  textShadow:
                    "0 2px 12px rgba(0,0,0,0.9), 0 0 40px rgba(0,0,0,0.6)",
                }}
              >
                $
                {balance.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>

              {/* Profit / Loss row */}
              <div className="flex items-center gap-2 mt-3">
                <div
                  className={`flex items-center gap-1 ${
                    isProfitPositive ? "text-emerald-300" : "text-red-300"
                  }`}
                >
                  {isProfitPositive ? (
                    <TrendingUp className="w-3.5 h-3.5 shrink-0" />
                  ) : (
                    <TrendingDown className="w-3.5 h-3.5 shrink-0" />
                  )}
                  <span className="text-sm font-bold font-mono">
                    {isProfitPositive ? "+" : ""}
                    {totalProfits.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </div>

                {totalDeposits > 0 && (
                  <span
                    className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full border ${
                      isProfitPositive
                        ? "bg-emerald-500/20 border-emerald-400/30 text-emerald-300"
                        : "bg-red-500/20 border-red-400/30 text-red-300"
                    }`}
                  >
                    {isProfitPositive ? "+" : ""}
                    {profitPercent.toFixed(2)}%
                  </span>
                )}
              </div>

              <p className="text-[8px] text-blue-200/40 mt-1 uppercase tracking-wider">
                Total Profit / Loss
              </p>
            </div>

            {/* Bottom stats strip — dark panel blocks the ambient glow */}
            <div className="relative z-10 mt-25 lg:mt-5 lg:max-w-112.5 grid grid-cols-2 rounded-xl bg-black/30 backdrop-blur-md border border-yellow-400/20 overflow-hidden">
              <div className="px-4 py-3">
                <p className="text-[9px] font-semibold text-blue-200/60 uppercase tracking-wider mb-1">
                  Profit
                </p>
                <p className="text-[13px] font-semibold text-white font-mono">
                  $
                  {totalProfits.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
              </div>

              <div className="px-4 py-3 border-l border-yellow-400/20">
                <p className="text-[9px] font-semibold text-blue-200/60 uppercase tracking-wider mb-1">
                  Deposited
                </p>
                <p className="text-[13px] font-semibold text-white font-mono">
                  $
                  {totalDeposits.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Action Buttons */}
      <div className="grid grid-cols-4 gap-2 sm:gap-3 mb-8">
        {[
          { label: "Deposit", icon: Plus, onClick: onDeposit, href: null },
          { label: "Withdraw", icon: Minus, onClick: onWithdraw, href: null },
          {
            label: "Transfer",
            icon: ArrowUpFromLine,
            onClick: null,
            href: "/transfer",
          },
          { label: "History", icon: Clock, onClick: onHistory, href: null },
        ].map((action) => {
          const content = (
            <>
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-blue-100/80 dark:bg-blue-400/10 flex items-center justify-center transition-colors group-hover:bg-blue-200/80 dark:group-hover:bg-blue-400/20">
                <action.icon className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <span className="text-[10px] sm:text-[11px] font-medium text-gray-600 dark:text-gray-300">
                {action.label}
              </span>
            </>
          );

          const className =
            "group bg-white/70 dark:bg-white/[0.04] backdrop-blur-xl border border-gray-200/50 dark:border-white/[0.08] rounded-xl py-3 sm:py-4 px-1.5 sm:px-2 flex flex-col items-center gap-1.5 sm:gap-2 transition-all duration-300 shadow-sm hover:shadow-md hover:shadow-blue-500/5 dark:hover:shadow-blue-500/10 hover:border-blue-300/50 dark:hover:border-blue-500/20 hover:bg-white/90 dark:hover:bg-white/[0.08]";

          if (action.href) {
            return (
              <Link key={action.label} href={action.href}>
                <motion.div
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className={className}
                >
                  {content}
                </motion.div>
              </Link>
            );
          }

          return (
            <motion.button
              key={action.label}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={action.onClick || undefined}
              className={className}
            >
              {content}
            </motion.button>
          );
        })}
      </div>

      {/* Account Summary */}
      {/* <div className="space-y-3">
        <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">
          Account summary
        </h3>

        <div className="grid grid-cols-2 gap-3">
          
          <div className="rounded-xl bg-white/90 dark:bg-[#1a2744]/80 backdrop-blur-xl border border-gray-200/50 dark:border-white/10 p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <Wallet className="w-4 h-4 text-blue-500 dark:text-blue-400" />
              <span className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Total Deposits
              </span>
            </div>
            <p className="text-[13px] sm:text-sm md:text-lg font-bold text-gray-900 dark:text-white">
              $
              {totalDeposits.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
          </div>

          
          <div className="rounded-xl bg-white/90 dark:bg-[#1a2744]/80 backdrop-blur-xl border border-gray-200/50 dark:border-white/10 p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
              <span className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Total Profits
              </span>
            </div>
            <p className="text-[13px] sm:text-sm md:text-lg font-bold text-gray-900 dark:text-white">
              $
              {totalProfits.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
          </div>
        </div>
      </div> */}
    </motion.div>
  );
}
