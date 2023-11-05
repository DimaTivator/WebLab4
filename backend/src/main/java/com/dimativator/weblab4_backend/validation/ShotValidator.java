package com.dimativator.weblab4_backend.validation;

import com.dimativator.weblab4_backend.model.Shot;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class ShotValidator {

    private List<Double> xValues = new ArrayList<>(Arrays.asList(
            -2.0, -1.5, -1.0, -0.5, 0.0, 0.5, 1.0, 1.5, 2.0
    ));

    private List<Double> rValues = new ArrayList<>(Arrays.asList(
            0.0, 0.5, 1.0, 1.5, 2.0
    ));


    private boolean validX(double x) {
        return xValues.contains(x);
    }


    private boolean validY(double y) {
        return -3 <= y && y <= 5;
    }


    private boolean validR(double r) {
        return rValues.contains(r);
    }


    public boolean validate(Shot shot) {
        return validX(shot.getXValue()) && validY(shot.getYValue()) && validR(shot.getRValue());
    }
}
