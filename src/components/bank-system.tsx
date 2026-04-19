'use client';

import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Landmark, PlusCircle, LogIn, ArrowLeft, Wallet, ArrowUpCircle, ArrowDownCircle, History } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ScrollArea } from './ui/scroll-area';

interface Transaction {
  type: 'deposit' | 'withdraw';
  amount: number;
  date: string;
}

interface BankAccount {
  name: string;
  password: string;
  balance: number;
  dateCreated: string;
  transactions: Transaction[];
}

export function BankSystem() {
  const { toast } = useToast();
  const [accounts, setAccounts] = useState<BankAccount[]>([]);
  const [view, setView] = useState<'main' | 'create' | 'access' | 'dashboard'>('main');
  
  // Forms
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [loginName, setLoginName] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [amount, setAmount] = useState('');

  const [activeAccount, setActiveAccount] = useState<BankAccount | null>(null);

  const handleCreateAccount = () => {
    if (!name || !password) {
      toast({ variant: "destructive", title: "Error", description: "Name and password are required." });
      return;
    }
    const exists = accounts.find(a => a.name === name);
    if (exists) {
      toast({ variant: "destructive", title: "Error", description: "Account already exists." });
      return;
    }

    const newAccount: BankAccount = {
      name,
      password,
      balance: 0,
      dateCreated: new Date().toLocaleString(),
      transactions: []
    };

    setAccounts([...accounts, newAccount]);
    toast({ title: "Success", description: "Account created successfully!" });
    setName('');
    setPassword('');
    setView('main');
  };

  const handleAccessAccount = () => {
    const account = accounts.find(a => a.name === loginName && a.password === loginPassword);
    if (account) {
      setActiveAccount(account);
      setView('dashboard');
      setLoginName('');
      setLoginPassword('');
    } else {
      toast({ variant: "destructive", title: "Error", description: "Invalid credentials." });
    }
  };

  const handleTransaction = (type: 'deposit' | 'withdraw') => {
    const val = parseFloat(amount);
    if (isNaN(val) || val <= 0) {
      toast({ variant: "destructive", title: "Error", description: "Please enter a valid amount." });
      return;
    }

    if (!activeAccount) return;

    if (type === 'withdraw' && activeAccount.balance < val) {
      toast({ variant: "destructive", title: "Error", description: "Insufficient balance." });
      return;
    }

    const updatedAccount = { ...activeAccount };
    if (type === 'deposit') {
      updatedAccount.balance += val;
    } else {
      updatedAccount.balance -= val;
    }

    updatedAccount.transactions.unshift({
      type,
      amount: val,
      date: new Date().toLocaleString()
    });

    // Update state
    setAccounts(accounts.map(a => a.name === activeAccount.name ? updatedAccount : a));
    setActiveAccount(updatedAccount);
    setAmount('');
    toast({ title: "Done", description: `Transaction of $${val} successful.` });
  };

  const handleLogout = () => {
    setActiveAccount(null);
    setView('main');
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      {view === 'main' && (
        <Card className="text-center">
          <CardHeader>
            <Landmark className="h-16 w-16 mx-auto mb-4 text-accent" />
            <CardTitle className="text-3xl">Bank Management System</CardTitle>
            <CardDescription>Welcome to our professional banking portal</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Button onClick={() => setView('create')} className="h-16 text-lg">
              <PlusCircle className="mr-2" /> Create New Account
            </Button>
            <Button onClick={() => setView('access')} variant="secondary" className="h-16 text-lg">
              <LogIn className="mr-2" /> Access Existing Account
            </Button>
          </CardContent>
          <CardFooter className="justify-center text-sm text-muted-foreground">
            Total active accounts: {accounts.length}
          </CardFooter>
        </Card>
      )}

      {view === 'create' && (
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <Button variant="ghost" size="icon" onClick={() => setView('main')}>
                <ArrowLeft />
              </Button>
              <CardTitle>Create Account</CardTitle>
            </div>
            <CardDescription>Enter your details to register</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label>Full Name</label>
              <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" />
            </div>
            <div className="space-y-2">
              <label>Password</label>
              <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Secure password" />
            </div>
            <Button onClick={handleCreateAccount} className="w-full">Register Account</Button>
          </CardContent>
        </Card>
      )}

      {view === 'access' && (
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <Button variant="ghost" size="icon" onClick={() => setView('main')}>
                <ArrowLeft />
              </Button>
              <CardTitle>Access Portal</CardTitle>
            </div>
            <CardDescription>Login to manage your funds</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label>Account Name</label>
              <Input value={loginName} onChange={(e) => setLoginName(e.target.value)} placeholder="Your registered name" />
            </div>
            <div className="space-y-2">
              <label>Password</label>
              <Input type="password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} placeholder="Your password" />
            </div>
            <Button onClick={handleAccessAccount} className="w-full">Log In</Button>
          </CardContent>
        </Card>
      )}

      {view === 'dashboard' && activeAccount && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wallet className="text-accent" /> Balance
              </CardTitle>
              <CardDescription>Current available funds</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-accent mb-2">
                ${activeAccount.balance.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground italic">Member since: {activeAccount.dateCreated}</p>
            </CardContent>
            <CardFooter>
              <Button variant="destructive" onClick={handleLogout} className="w-full">Log Out</Button>
            </CardFooter>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Transactions</CardTitle>
              <CardDescription>Manage your deposits and withdrawals</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex gap-4">
                <Input 
                  type="number" 
                  placeholder="Amount" 
                  value={amount} 
                  onChange={(e) => setAmount(e.target.value)} 
                  className="flex-grow text-lg"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Button onClick={() => handleTransaction('deposit')} variant="default" className="bg-green-600 hover:bg-green-700">
                  <ArrowUpCircle className="mr-2" /> Deposit
                </Button>
                <Button onClick={() => handleTransaction('withdraw')} variant="destructive">
                  <ArrowDownCircle className="mr-2" /> Withdraw
                </Button>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold flex items-center gap-2">
                  <History className="h-4 w-4" /> Transaction History
                </h4>
                <ScrollArea className="h-[200px] rounded-md border p-4">
                  {activeAccount.transactions.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">No transactions yet.</div>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Type</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Date</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {activeAccount.transactions.map((t, i) => (
                          <TableRow key={i}>
                            <TableCell className={t.type === 'deposit' ? 'text-green-500 capitalize' : 'text-red-500 capitalize'}>
                              {t.type}
                            </TableCell>
                            <TableCell className="font-medium">
                              {t.type === 'deposit' ? '+' : '-'}${t.amount.toLocaleString()}
                            </TableCell>
                            <TableCell className="text-xs text-muted-foreground">{t.date}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </ScrollArea>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}