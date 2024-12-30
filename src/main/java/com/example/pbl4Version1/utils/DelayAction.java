package com.example.pbl4Version1.utils;

import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.ScheduledFuture;
import java.util.concurrent.TimeUnit;

public class DelayAction {
    private final ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(1);
    private ScheduledFuture<?> future;

    public void executeWithDelay(Runnable action, int delay) {
        future = scheduler.schedule(action, delay, TimeUnit.SECONDS);
    }

    public void cancelAction() {
        if (future != null && !future.isDone()) {
            future.cancel(true);
        }
    }
}
