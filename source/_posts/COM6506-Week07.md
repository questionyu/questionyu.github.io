---
title: COM6506 Week07
date: 2018-11-04 23:17:35
categories:
  - Code
tags:
  - Java
  - COM6506
---

{% note info %}
## Diamond Gate
{% endnote %}

``` java
package diamond;

import java.util.Collection;
import java.util.HashSet;

class DiamondGate {

	private DiamondGateState state;
	private Collection<String> registered;
	private int visitors;
	private Collection<String> overdue, bookList;

	DiamondGate(Collection<String> registered, Collection<String> overdue) {
		this.registered = registered;
		this.overdue = overdue;
		this.bookList = new HashSet<>();
		this.visitors = 0;
		this.state = new Idle(this);
	}

	// State Machine operations

	void entry_scan(String key) {
		state.entry_scan(key);
	}

	void exit_scan(String key) {
		state.exit_scan(key);
	}

	void entry_sensor_activated() {
		state.entry_sensor_activated();
	}

	void exit_sensor_activated() {
		state.exit_sensor_activated();
	}

	void time_out() {
		state.time_out();
	}

	void pay_fine(String key) {
		state.pay_fine(key);
	}

	void return_book(String key) {
		state.return_book(key);
	}

	// Context operations

	DiamondGateState.State getState() {
		return state.getState();
	}

	void setState(DiamondGateState state) {
		this.state = state;
	}

	boolean isRegistered(String s) {
		return registered.contains(s);
	}

	void incrementVisitors() {
		visitors++;
	}

	void decrementVisitors() {
		visitors--;
	}

	int getVisitors() {
		return visitors;
	}

	boolean isOverdue(String key) {
		return overdue.contains(key);
	}

	void paid_fine(String key) {
		if (overdue.contains(key)) {
			overdue.remove(key);
			bookList.add(key);
		}
	}

	void returned_book(String key) {
		if (bookList.contains(key)) {
			bookList.remove(key);
		}
	}
}
```
<!--more-->
``` java
package diamond;

abstract class DiamondGateState {

	protected enum State {IDLE, OPENEXIT, OPENENTRY, PAIDFINE}

	DiamondGate context;

	DiamondGateState(DiamondGate context) {
		this.context = context;
	}

	abstract void entry_scan(String key);

	abstract void exit_scan(String key);

	abstract void entry_sensor_activated();

	abstract void exit_sensor_activated();

	abstract void time_out();

	abstract void pay_fine(String key);

	abstract void return_book(String key);

	abstract State getState();
}
```

``` java
package diamond;

import org.junit.jupiter.api.Test;

import java.util.Collection;
import java.util.HashSet;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

class DiamondGateTest {
	@Test
	void testSimpleEntry() {
		// Create our set of registered students / staff.
		Collection<String> registered = new HashSet<>();
		registered.add("ac1nw");

		Collection<String> overdue = new HashSet<>();

		// Pass this when constructing our system under test (diamondGate);
		DiamondGate diamondGate = new DiamondGate(registered, overdue);

		assertEquals(0, diamondGate.getVisitors());

		// Now for the actual test sequence:
		diamondGate.entry_scan("ac1nw");

		// We know that ac1nw is registered.
		diamondGate.entry_sensor_activated();
		diamondGate.time_out();

		// We'd expect the number of visitors in the Diamond to be 1.
		assertEquals(1, diamondGate.getVisitors());
	}

	@Test
	void testSimpleExit() {
		Collection<String> registered = new HashSet<>();
		registered.add("acs18by");

		Collection<String> overdue = new HashSet<>();

		DiamondGate diamondGate = new DiamondGate(registered, overdue);

		assertEquals(0, diamondGate.getVisitors());

		diamondGate.exit_scan("acs18by");

		diamondGate.exit_sensor_activated();
		diamondGate.time_out();

		assertEquals(-1, diamondGate.getVisitors());
	}

	@Test
	void testEntryTimeout() {
		Collection<String> registered = new HashSet<>();
		registered.add("acs18by");

		Collection<String> overdue = new HashSet<>();

		DiamondGate diamondGate = new DiamondGate(registered, overdue);

		assertEquals(0, diamondGate.getVisitors());

		diamondGate.entry_scan("acs18by");

//		diamondGate.entry_sensor_activated();
		diamondGate.time_out();

		assertEquals(0, diamondGate.getVisitors());
	}

	@Test
	void testExitTimeout() {
		Collection<String> registered = new HashSet<>();
		registered.add("acs18by");

		Collection<String> overdue = new HashSet<>();

		DiamondGate diamondGate = new DiamondGate(registered, overdue);

		assertEquals(0, diamondGate.getVisitors());

		diamondGate.exit_scan("acs18by");

//		diamondGate.exit_sensor_activated();
		diamondGate.time_out();

		assertEquals(0, diamondGate.getVisitors());
	}

	@Test
	void testOverdue() {
		Collection<String> registered = new HashSet<>();
		registered.add("acs18test");

		Collection<String> overdue = new HashSet<>();
		overdue.add("acs18test");

		DiamondGate diamondGate = new DiamondGate(registered, overdue);

		assertEquals(0, diamondGate.getVisitors());

		diamondGate.entry_scan("acs18test");

		diamondGate.entry_sensor_activated();
		diamondGate.time_out();

		assertEquals(1, diamondGate.getVisitors());

		assertTrue(diamondGate.isOverdue("acs18test"));

		diamondGate.exit_scan("acs18test");
		diamondGate.exit_sensor_activated();
		diamondGate.time_out();

		assertEquals(1, diamondGate.getVisitors());

		diamondGate.pay_fine("acs18test");

		assertFalse(diamondGate.isOverdue("acs18test"));

		assertEquals(DiamondGateState.State.PAIDFINE, diamondGate.getState());

		diamondGate.return_book("acs18test");

		assertEquals(DiamondGateState.State.IDLE, diamondGate.getState());

		diamondGate.exit_scan("acs18test");

		diamondGate.exit_sensor_activated();
		diamondGate.time_out();

		assertEquals(0, diamondGate.getVisitors());
	}

	@Test
	void testNotRegisteredEntry() {
		Collection<String> registered = new HashSet<>();
		registered.add("acs18by");

		Collection<String> overdue = new HashSet<>();

		DiamondGate diamondGate = new DiamondGate(registered, overdue);

		assertEquals(0, diamondGate.getVisitors());

		diamondGate.entry_scan("acs18test");

		diamondGate.entry_sensor_activated();
		diamondGate.time_out();

		assertEquals(0, diamondGate.getVisitors());
	}

	@Test
	void testMultiEntry() {
		Collection<String> registered = new HashSet<>();
		registered.add("acs18test1");
		registered.add("acs18test2");

		Collection<String> overdue = new HashSet<>();

		DiamondGate diamondGate = new DiamondGate(registered, overdue);

		assertEquals(0, diamondGate.getVisitors());

		diamondGate.entry_scan("acs18test1");

		diamondGate.entry_sensor_activated();
		diamondGate.time_out();

		assertEquals(1, diamondGate.getVisitors());

		diamondGate.entry_scan("acs18test2");

		diamondGate.entry_sensor_activated();
		diamondGate.time_out();

		assertEquals(2, diamondGate.getVisitors());
	}

	@Test
	void testEntryAndExit() {
		Collection<String> registered = new HashSet<>();
		registered.add("acs18test1");
		registered.add("acs18test2");

		Collection<String> overdue = new HashSet<>();

		DiamondGate diamondGate = new DiamondGate(registered, overdue);

		assertEquals(0, diamondGate.getVisitors());

		diamondGate.entry_scan("acs18test1");

		diamondGate.entry_sensor_activated();
		diamondGate.time_out();

		assertEquals(1, diamondGate.getVisitors());

		diamondGate.entry_scan("acs18test2");

		diamondGate.entry_sensor_activated();
		diamondGate.time_out();

		assertEquals(2, diamondGate.getVisitors());

		diamondGate.exit_scan("acs18test1");

		diamondGate.exit_sensor_activated();
		diamondGate.time_out();

		assertEquals(1, diamondGate.getVisitors());

		diamondGate.exit_scan("acs18test2");

		diamondGate.exit_sensor_activated();
		diamondGate.time_out();

		assertEquals(0, diamondGate.getVisitors());
	}

	@Test
	void testMultiExit() {
		Collection<String> registered = new HashSet<>();
		registered.add("acs18test1");
		registered.add("acs18test2");

		Collection<String> overdue = new HashSet<>();

		DiamondGate diamondGate = new DiamondGate(registered, overdue);

		assertEquals(0, diamondGate.getVisitors());

		diamondGate.exit_scan("acs18test1");

		diamondGate.exit_sensor_activated();
		diamondGate.time_out();

		assertEquals(-1, diamondGate.getVisitors());

		diamondGate.exit_scan("acs18test2");

		diamondGate.exit_sensor_activated();
		diamondGate.time_out();

		assertEquals(-2, diamondGate.getVisitors());
	}
}
```

``` java
package diamond;

class Idle extends DiamondGateState {

	Idle(DiamondGate context) {
		super(context);
	}

	@Override
	void entry_scan(String key) {
		if (context.isRegistered(key)) {
			context.setState(new OpenEntry(context));
		}
	}

	@Override
	void exit_scan(String key) {
		if (context.isRegistered(key) && !context.isOverdue(key)) {
			context.setState(new OpenExit(context));
		}
	}

	@Override
	void entry_sensor_activated() {

	}

	@Override
	void exit_sensor_activated() {

	}

	@Override
	void time_out() {

	}

	@Override
	void pay_fine(String key) {
		if (context.isOverdue(key)) {
			context.paid_fine(key);
			context.setState(new PaidFine(context));
		}
	}

	@Override
	void return_book(String key) {

	}

	@Override
	State getState() {
		return State.IDLE;
	}
}
```

``` java
package diamond;

import java.util.Timer;
import java.util.TimerTask;

class OpenEntry extends DiamondGateState {

	OpenEntry(DiamondGate context) {
		super(context);
		TimerTask task = new TimerTask() {
			@Override
			public void run() {
				context.time_out();
			}
		};
		Timer timer = new Timer("Timer");

		long delay = 5000L;
		timer.schedule(task, delay);
	}

	@Override
	void entry_scan(String key) {

	}

	@Override
	void exit_scan(String key) {

	}

	@Override
	void entry_sensor_activated() {
		context.incrementVisitors();
	}

	@Override
	void exit_sensor_activated() {

	}

	@Override
	void time_out() {
		context.setState(new Idle(context));
	}

	@Override
	void pay_fine(String key) {

	}

	@Override
	void return_book(String key) {

	}

	@Override
	State getState() {
		return State.OPENENTRY;
	}
}
```

``` java
package diamond;

import java.util.Timer;
import java.util.TimerTask;

class OpenExit extends DiamondGateState {

	OpenExit(DiamondGate context) {
		super(context);
		TimerTask task = new TimerTask() {
			@Override
			public void run() {
				context.time_out();
			}
		};
		Timer timer = new Timer("Timer");

		long delay = 5000L;
		timer.schedule(task, delay);
	}

	@Override
	void entry_scan(String key) {

	}

	@Override
	void exit_scan(String key) {

	}

	@Override
	void entry_sensor_activated() {

	}

	@Override
	void exit_sensor_activated() {
		context.decrementVisitors();
	}

	@Override
	void time_out() {
		context.setState(new Idle(context));
	}

	@Override
	void pay_fine(String key) {

	}

	@Override
	void return_book(String key) {

	}

	@Override
	State getState() {
		return State.OPENEXIT;
	}
}
```

``` java
package diamond;

class PaidFine extends DiamondGateState {
	PaidFine(DiamondGate context) {
		super(context);
	}

	@Override
	void entry_scan(String key) {

	}

	@Override
	void exit_scan(String key) {

	}

	@Override
	void entry_sensor_activated() {

	}

	@Override
	void exit_sensor_activated() {

	}

	@Override
	void time_out() {

	}

	@Override
	void pay_fine(String key) {

	}

	@Override
	void return_book(String key) {
		context.returned_book(key);
		context.setState(new Idle(context));
	}

	@Override
	State getState() {
		return State.PAIDFINE;
	}
}
```

{% note info %}
## TCP Server
{% endnote %}

``` java
public class TCP {
	TCPState state;

	public TCP() {
		this.state = new CLOSED(this);
	}

	void passive_open() {
		state.passive_open();
	}

	void close() {
		state.close();
	}

	void receive_syn() {
		state.receive_syn();
	}

	void receive_syn_ack() {
		state.receive_syn_ack();
	}

	void receive_fin() {
		state.receive_fin();
	}

	void receive_ack() {
		state.receive_ack();
	}

	void receive_ack_fin() {
		state.receive_ack_fin();
	}

	void send_syn_ack() {
		state.send_syn_ack();
	}

	void send_syn() {
		state.send_syn();
	}

	void send_ack() {
		state.send_ack();
	}

	void send_fin() {
		state.send_fin();
	}

	void timeout() {
		state.timeout();
	}

	void setState(TCPState state) {
		this.state = state;
	}

	TCPState.State getState() {
		return state.getState();
	}
}
```

``` java
public abstract class TCPState {
	protected enum State {
		CLOSED, LISTEN, SYN_RCVD, SYN_SENT, ESTABLISHED, CLOSE_WAIT,
		LAST_ACK, FIN_WAIT_1, FIN_WAIT_2, CLOSING, TIME_WAIT
	}

	protected TCP context;

	public TCPState(TCP context) {
		this.context = context;
	}

	public abstract void passive_open();

	public abstract void close();

	public abstract void receive_syn();

	public abstract void receive_syn_ack();

	public abstract void receive_fin();

	public abstract void receive_ack();

	public abstract void receive_ack_fin();

	public abstract void send_syn_ack();

	public abstract void send_syn();

	public abstract void send_ack();

	public abstract void send_fin();

	public abstract void timeout();

	public abstract State getState();
}
```

``` java
public class CLOSED extends TCPState {
	public CLOSED(TCP context) {
		super(context);
	}

	@Override
	public void passive_open() {
		context.setState(new LISTEN(context));
	}

	@Override
	public void close() {

	}

	@Override
	public void receive_syn() {

	}

	@Override
	public void receive_syn_ack() {

	}

	@Override
	public void receive_fin() {

	}

	@Override
	public void receive_ack() {

	}

	@Override
	public void receive_ack_fin() {

	}

	@Override
	public void send_syn_ack() {

	}

	@Override
	public void send_syn() {

	}

	@Override
	public void send_ack() {

	}

	@Override
	public void send_fin() {

	}

	@Override
	public void timeout() {

	}

	@Override
	public State getState() {
		return State.CLOSED;
	}
}
```

``` java
public class CLOSE_WAIT extends TCPState {
	public CLOSE_WAIT(TCP context) {
		super(context);
	}

	@Override
	public void passive_open() {

	}

	@Override
	public void close() {
		context.setState(new LAST_ACK(context));
	}

	@Override
	public void receive_syn() {

	}

	@Override
	public void receive_syn_ack() {

	}

	@Override
	public void receive_fin() {

	}

	@Override
	public void receive_ack() {

	}

	@Override
	public void receive_ack_fin() {

	}

	@Override
	public void send_syn_ack() {

	}

	@Override
	public void send_syn() {

	}

	@Override
	public void send_ack() {

	}

	@Override
	public void send_fin() {

	}

	@Override
	public void timeout() {

	}

	@Override
	public State getState() {
		return State.CLOSE_WAIT;
	}
}
```

``` java
public class CLOSING extends TCPState {
	public CLOSING(TCP context) {
		super(context);
	}

	@Override
	public void passive_open() {

	}

	@Override
	public void close() {

	}

	@Override
	public void receive_syn() {

	}

	@Override
	public void receive_syn_ack() {

	}

	@Override
	public void receive_fin() {

	}

	@Override
	public void receive_ack() {
		context.setState(new TIME_WAIT(context));
	}

	@Override
	public void receive_ack_fin() {

	}

	@Override
	public void send_syn_ack() {

	}

	@Override
	public void send_syn() {

	}

	@Override
	public void send_ack() {

	}

	@Override
	public void send_fin() {

	}

	@Override
	public void timeout() {

	}

	@Override
	public State getState() {
		return State.CLOSING;
	}
}
```

``` java
public class ESTABLISHED extends TCPState {
	public ESTABLISHED(TCP context) {
		super(context);
	}

	@Override
	public void passive_open() {

	}

	@Override
	public void close() {
		context.setState(new FIN_WAIT_1(context));
	}

	@Override
	public void receive_syn() {

	}

	@Override
	public void receive_syn_ack() {

	}

	@Override
	public void receive_fin() {
		context.setState(new CLOSE_WAIT(context));
	}

	@Override
	public void receive_ack() {

	}

	@Override
	public void receive_ack_fin() {

	}

	@Override
	public void send_syn_ack() {

	}

	@Override
	public void send_syn() {

	}

	@Override
	public void send_ack() {

	}

	@Override
	public void send_fin() {

	}

	@Override
	public void timeout() {

	}

	@Override
	public State getState() {
		return State.ESTABLISHED;
	}
}
```

``` java
import java.util.Random;

public class FIN_WAIT_1 extends TCPState {
	public FIN_WAIT_1(TCP context) {
		super(context);
	}

	@Override
	public void passive_open() {

	}

	@Override
	public void close() {

	}

	@Override
	public void receive_syn() {

	}

	@Override
	public void receive_syn_ack() {

	}

	@Override
	public void receive_fin() {
		context.setState(new CLOSING(context));
	}

	@Override
	public void receive_ack() {

	}

	@Override
	public void receive_ack_fin() {
		context.setState(new TIME_WAIT(context));
	}

	@Override
	public void send_syn_ack() {

	}

	@Override
	public void send_syn() {

	}

	@Override
	public void send_ack() {
		context.setState(new FIN_WAIT_2(context));
	}

	@Override
	public void send_fin() {

	}

	@Override
	public void timeout() {

	}

	@Override
	public State getState() {
		return State.FIN_WAIT_1;
	}
}
```

``` java
public class FIN_WAIT_2 extends TCPState {
	public FIN_WAIT_2(TCP context) {
		super(context);
	}

	@Override
	public void passive_open() {

	}

	@Override
	public void close() {

	}

	@Override
	public void receive_syn() {

	}

	@Override
	public void receive_syn_ack() {

	}

	@Override
	public void receive_fin() {
		context.setState(new TIME_WAIT(context));
	}

	@Override
	public void receive_ack() {

	}

	@Override
	public void receive_ack_fin() {

	}

	@Override
	public void send_syn_ack() {

	}

	@Override
	public void send_syn() {

	}

	@Override
	public void send_ack() {

	}

	@Override
	public void send_fin() {

	}

	@Override
	public void timeout() {

	}

	@Override
	public State getState() {
		return State.FIN_WAIT_2;
	}
}
```

``` java
public class LAST_ACK extends TCPState {
	public LAST_ACK(TCP context) {
		super(context);
	}

	@Override
	public void passive_open() {

	}

	@Override
	public void close() {

	}

	@Override
	public void receive_syn() {

	}

	@Override
	public void receive_syn_ack() {

	}

	@Override
	public void receive_fin() {

	}

	@Override
	public void receive_ack() {
		context.setState(new CLOSED(context));
	}

	@Override
	public void receive_ack_fin() {

	}

	@Override
	public void send_syn_ack() {

	}

	@Override
	public void send_syn() {

	}

	@Override
	public void send_ack() {

	}

	@Override
	public void send_fin() {

	}

	@Override
	public void timeout() {

	}

	@Override
	public State getState() {
		return State.LAST_ACK;
	}
}
```

``` java
public class LISTEN extends TCPState {
	public LISTEN(TCP context) {
		super(context);
	}

	@Override
	public void passive_open() {

	}

	@Override
	public void close() {
		context.setState(new CLOSED(context));
	}

	@Override
	public void receive_syn() {
		context.setState(new SYN_RCVD(context));
	}

	@Override
	public void receive_syn_ack() {

	}

	@Override
	public void receive_fin() {

	}

	@Override
	public void receive_ack() {

	}

	@Override
	public void receive_ack_fin() {

	}

	@Override
	public void send_syn_ack() {

	}

	@Override
	public void send_syn() {
		context.setState(new SYN_SENT(context));
	}

	@Override
	public void send_ack() {

	}

	@Override
	public void send_fin() {

	}

	@Override
	public void timeout() {

	}

	@Override
	public State getState() {
		return State.LISTEN;
	}
}
```

``` java
public class SYN_RCVD extends TCPState {
	public SYN_RCVD(TCP context) {
		super(context);
	}

	@Override
	public void passive_open() {

	}

	@Override
	public void close() {
		context.setState(new FIN_WAIT_1(context));
	}

	@Override
	public void receive_syn() {

	}

	@Override
	public void receive_syn_ack() {

	}

	@Override
	public void receive_fin() {

	}

	@Override
	public void receive_ack() {

	}

	@Override
	public void receive_ack_fin() {

	}

	@Override
	public void send_syn_ack() {

	}

	@Override
	public void send_syn() {

	}

	@Override
	public void send_ack() {
		context.setState(new ESTABLISHED(context));
	}

	@Override
	public void send_fin() {

	}

	@Override
	public void timeout() {

	}

	@Override
	public State getState() {
		return State.SYN_RCVD;
	}
}
```

``` java
public class SYN_SENT extends TCPState {
	public SYN_SENT(TCP context) {
		super(context);
	}

	@Override
	public void passive_open() {

	}

	@Override
	public void close() {

	}

	@Override
	public void receive_syn() {
		context.setState(new SYN_RCVD(context));
	}

	@Override
	public void receive_syn_ack() {
		context.setState(new ESTABLISHED(context));
	}

	@Override
	public void receive_fin() {

	}

	@Override
	public void receive_ack() {

	}

	@Override
	public void receive_ack_fin() {

	}

	@Override
	public void send_syn_ack() {

	}

	@Override
	public void send_syn() {

	}

	@Override
	public void send_ack() {

	}

	@Override
	public void send_fin() {

	}

	@Override
	public void timeout() {

	}

	@Override
	public State getState() {
		return State.SYN_SENT;
	}
}
```

``` java
import java.util.Timer;
import java.util.TimerTask;

public class TIME_WAIT extends TCPState {
	public TIME_WAIT(TCP context) {
		super(context);
		TimerTask task = new TimerTask() {
			@Override
			public void run() {
				context.timeout();
			}
		};
		Timer timer = new Timer("Timer");

		long delay = 5000L;
		timer.schedule(task, delay);
	}

	@Override
	public void passive_open() {

	}

	@Override
	public void close() {

	}

	@Override
	public void receive_syn() {

	}

	@Override
	public void receive_syn_ack() {

	}

	@Override
	public void receive_fin() {

	}

	@Override
	public void receive_ack() {

	}

	@Override
	public void receive_ack_fin() {

	}

	@Override
	public void send_syn_ack() {

	}

	@Override
	public void send_syn() {

	}

	@Override
	public void send_ack() {

	}

	@Override
	public void send_fin() {

	}

	@Override
	public void timeout() {
		context.setState(new CLOSED(context));
	}

	@Override
	public State getState() {
		return State.TIME_WAIT;
	}
}
```

``` java
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class TCPTest {
	@Test
	void testTCP1() {
		TCP tcp = new TCP();
		System.out.print(tcp.getState());
		assertEquals(TCPState.State.CLOSED, tcp.getState());

		System.out.print("->");

		tcp.passive_open();
		System.out.print(tcp.getState());
		assertEquals(TCPState.State.LISTEN, tcp.getState());

		System.out.print("->");

		tcp.receive_syn();
		System.out.print(tcp.getState());
		assertEquals(TCPState.State.SYN_RCVD, tcp.getState());

		System.out.print("->");

		tcp.send_ack();
		System.out.print(tcp.getState());
		assertEquals(TCPState.State.ESTABLISHED, tcp.getState());

		System.out.print("->");

		tcp.receive_fin();
		System.out.print(tcp.getState());
		assertEquals(TCPState.State.CLOSE_WAIT, tcp.getState());

		System.out.print("->");

		tcp.close();
		System.out.print(tcp.getState());
		assertEquals(TCPState.State.LAST_ACK, tcp.getState());

		System.out.print("->");

		tcp.receive_ack();
		System.out.print(tcp.getState());
		assertEquals(TCPState.State.CLOSED, tcp.getState());

		System.out.println();
	}

	@Test
	void testTCP2() {
		TCP tcp = new TCP();
		System.out.print(tcp.getState());
		assertEquals(TCPState.State.CLOSED, tcp.getState());

		System.out.print("->");

		tcp.passive_open();
		System.out.print(tcp.getState());
		assertEquals(TCPState.State.LISTEN, tcp.getState());

		System.out.print("->");

		tcp.send_syn();
		System.out.print(tcp.getState());
		assertEquals(TCPState.State.SYN_SENT, tcp.getState());

		System.out.print("->");

		tcp.receive_syn_ack();
		System.out.print(tcp.getState());
		assertEquals(TCPState.State.ESTABLISHED, tcp.getState());

		System.out.print("->");

		tcp.close();
		System.out.print(tcp.getState());
		assertEquals(TCPState.State.FIN_WAIT_1, tcp.getState());

		System.out.print("->");

		tcp.receive_fin();
		System.out.print(tcp.getState());
		assertEquals(TCPState.State.CLOSING, tcp.getState());

		System.out.print("->");

		tcp.receive_ack();
		System.out.print(tcp.getState());
		assertEquals(TCPState.State.TIME_WAIT, tcp.getState());

		System.out.print("->");

		tcp.timeout();
		System.out.print(tcp.getState());
		assertEquals(TCPState.State.CLOSED, tcp.getState());

		System.out.println();
	}

	@Test
	void testTCP3() {
		TCP tcp = new TCP();
		System.out.print(tcp.getState());
		assertEquals(TCPState.State.CLOSED, tcp.getState());

		System.out.print("->");

		tcp.passive_open();
		System.out.print(tcp.getState());
		assertEquals(TCPState.State.LISTEN, tcp.getState());

		System.out.print("->");

		tcp.send_syn();
		System.out.print(tcp.getState());
		assertEquals(TCPState.State.SYN_SENT, tcp.getState());

		System.out.print("->");

		tcp.receive_syn();
		System.out.print(tcp.getState());
		assertEquals(TCPState.State.SYN_RCVD, tcp.getState());

		System.out.print("->");

		tcp.close();
		System.out.print(tcp.getState());
		assertEquals(TCPState.State.FIN_WAIT_1, tcp.getState());

		System.out.print("->");

		tcp.send_ack();
		System.out.print(tcp.getState());
		assertEquals(TCPState.State.FIN_WAIT_2, tcp.getState());

		System.out.print("->");

		tcp.receive_fin();
		System.out.print(tcp.getState());
		assertEquals(TCPState.State.TIME_WAIT, tcp.getState());

		System.out.print("->");

		tcp.timeout();
		System.out.print(tcp.getState());
		assertEquals(TCPState.State.CLOSED, tcp.getState());

		System.out.println();
	}

	@Test
	void testTCP4() {
		TCP tcp = new TCP();
		System.out.print(tcp.getState());
		assertEquals(TCPState.State.CLOSED, tcp.getState());

		System.out.print("->");

		tcp.passive_open();
		System.out.print(tcp.getState());
		assertEquals(TCPState.State.LISTEN, tcp.getState());

		System.out.print("->");

		tcp.receive_syn();
		System.out.print(tcp.getState());
		assertEquals(TCPState.State.SYN_RCVD, tcp.getState());

		System.out.print("->");

		tcp.close();
		System.out.print(tcp.getState());
		assertEquals(TCPState.State.FIN_WAIT_1, tcp.getState());

		System.out.print("->");

		tcp.receive_ack_fin();
		System.out.print(tcp.getState());
		assertEquals(TCPState.State.TIME_WAIT, tcp.getState());

		System.out.print("->");

		tcp.timeout();
		System.out.print(tcp.getState());
		assertEquals(TCPState.State.CLOSED, tcp.getState());

		System.out.println();
	}

	@Test
	void testTCP5() {
		TCP tcp = new TCP();
		System.out.print(tcp.getState());
		assertEquals(TCPState.State.CLOSED, tcp.getState());

		System.out.print("->");

		tcp.passive_open();
		System.out.print(tcp.getState());
		assertEquals(TCPState.State.LISTEN, tcp.getState());

		System.out.print("->");

		tcp.receive_syn();
		System.out.print(tcp.getState());
		assertEquals(TCPState.State.SYN_RCVD, tcp.getState());

		System.out.print("->");

		tcp.send_ack();
		System.out.print(tcp.getState());
		assertEquals(TCPState.State.ESTABLISHED, tcp.getState());

		System.out.print("->");

		tcp.close();
		System.out.print(tcp.getState());
		assertEquals(TCPState.State.FIN_WAIT_1, tcp.getState());

		System.out.print("->");

		tcp.receive_ack_fin();
		System.out.print(tcp.getState());
		assertEquals(TCPState.State.TIME_WAIT, tcp.getState());

		System.out.print("->");

		tcp.timeout();
		System.out.print(tcp.getState());
		assertEquals(TCPState.State.CLOSED, tcp.getState());

		System.out.println();
	}
}
```
