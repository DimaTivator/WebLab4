package com.dimativator.weblab4_backend.validation;

import com.dimativator.weblab4_backend.model.Shot;

public class HitChecker {

    private boolean checkRectangle(double x, double y, double r) {
        return x <= 0 && y <= 0 && Math.abs(x) <= r / 2 && Math.abs(y) <= r;
    }

    private boolean checkTriangle(double x, double y, double r) {
        return x >= 0 && y <= 0 && x - y <= r;
    }

    private boolean checkCircle(double x, double y, double r) {
        return x <= 0 && y >= 0 && x * x + y * y <= r * r;
    }

    public boolean checkHit(Shot shot) {
        return checkRectangle(shot.getXValue(), shot.getYValue(), shot.getRValue()) ||
                checkCircle(shot.getXValue(), shot.getYValue(), shot.getRValue()) ||
                checkTriangle(shot.getXValue(), shot.getYValue(), shot.getRValue());
    }
}
