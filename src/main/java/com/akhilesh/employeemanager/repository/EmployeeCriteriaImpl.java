package com.akhilesh.employeemanager.repository;

import com.akhilesh.employeemanager.entities.Employee;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class EmployeeCriteriaImpl implements EmployeeCriteria{
    EntityManager em;
    public EmployeeCriteriaImpl(EntityManager em){
        this.em = em;
    }
    @Override
        public List<Employee> findEmployeesByName(String name){
        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery<Employee> cq = cb.createQuery(Employee.class);

        Root<Employee> employee = cq.from(Employee.class);
        Predicate employeeNamePredicate = cb.like(employee.get("name"),"%"+name+"%");
        cq.where(employeeNamePredicate);

        TypedQuery<Employee> query = em.createQuery(cq);
        return query.getResultList();
    }
}
