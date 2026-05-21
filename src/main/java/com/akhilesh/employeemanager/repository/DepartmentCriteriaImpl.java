package com.akhilesh.employeemanager.repository;

import com.akhilesh.employeemanager.entities.Department;
import jakarta.persistence.EntityManager;
import jakarta.persistence.criteria.*;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class DepartmentCriteriaImpl implements DepartmentCriteria{
    EntityManager em;
    public DepartmentCriteriaImpl(EntityManager em){
        this.em = em;
    }
    @Override
    public List<Department> findDepartmentByNameLocation(String departmentName, String location, String order, String dir) {
        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery<Department> cq = cb.createQuery(Department.class);

        Root<Department> departments = cq.from(Department.class);
        List<Predicate> predicates = new ArrayList<>();
        List<Order> orders = new ArrayList<>();
        if(departmentName!=null){
            predicates.add(cb.like(cb.lower(departments.get("departmentName")), "%"+departmentName.toLowerCase()+"%"));
        }
        if(location!=null){
            predicates.add(cb.equal(cb.lower(departments.get("location")), location.toLowerCase()));
        }
        if(order!=null){
            if(order.equalsIgnoreCase("departmentName")||order.equalsIgnoreCase("location")){
                if(dir!=null && dir.equalsIgnoreCase("desc")){
                    orders.add(cb.desc(departments.get(order)));
                }
                else {
                    orders.add(cb.asc(departments.get(order)));
                }
            }
        }
        cq.where(predicates.toArray(new Predicate[0])).orderBy(orders);
        return em.createQuery(cq).getResultList();
    }
}
