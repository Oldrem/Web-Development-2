package beans;

import model.Point;

import java.util.ArrayList;
import java.util.List;

public class History {
    private List<Point> list;

    public History(){
        list = new ArrayList<Point>();
    }

    public void addPoint(Point point){
        list.add(point);
    }

    public List<Point> getList(){
        return list;
    }
}
